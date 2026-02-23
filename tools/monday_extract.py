#!/usr/bin/env python3
"""
Monday.com API Extraction Script for DeepSee Dashboard
Extracts sales pipeline data via Monday.com GraphQL API.
"""

import json
import os
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

import requests

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

SCRIPT_DIR = Path(__file__).resolve().parent
ENV_PATH = SCRIPT_DIR / ".env"
OUTPUT_DIR = SCRIPT_DIR / "output"
OUTPUT_DIR.mkdir(exist_ok=True)

def load_env():
    env = {}
    if ENV_PATH.exists():
        for line in ENV_PATH.read_text().splitlines():
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                env[k.strip()] = v.strip()
    return env

ENV = load_env()
API_URL = ENV.get("MONDAY_API_URL", "https://api.monday.com/v2")
API_TOKEN = ENV.get("MONDAY_API_TOKEN", "")

HEADERS = {
    "Authorization": API_TOKEN,
    "Content-Type": "application/json",
    "API-Version": "2024-10",
}

# Stage -> probability mapping
STAGE_PROBABILITIES = {
    "qualified lead": 0.05,
    "discovery": 0.05,
    "problem validation": 0.10,
    "value framing": 0.10,
    "solution fit": 0.25,
    "technical validation": 0.25,
    "business case": 0.35,
    "champion commit": 0.35,
    "pov": 0.35,
    "commercial alignment": 0.60,
    "contracting": 0.80,
    "close": 0.80,
    "won": 0.95,
    "renewal": 0.90,
}

STRATEGIC_ACCOUNTS = [
    "dtcc", "broadridge", "colony bank", "colony", "bbva", "ctc",
    "jp morgan", "goldman sachs", "sunwest", "accenture",
]

# ---------------------------------------------------------------------------
# GraphQL Helpers
# ---------------------------------------------------------------------------

def monday_query(query, variables=None):
    """Execute a GraphQL query against Monday.com API."""
    payload = {"query": query}
    if variables:
        payload["variables"] = variables
    resp = requests.post(API_URL, headers=HEADERS, json=payload)
    resp.raise_for_status()
    data = resp.json()
    if "errors" in data:
        print(f"[MONDAY ERROR] {data['errors']}")
    return data.get("data", {})


def discover_boards():
    """Find all boards and identify the CRM/pipeline board."""
    data = monday_query("""
    {
        boards(limit: 50) {
            id
            name
            items_count
            columns { id title type }
        }
    }
    """)
    boards = data.get("boards", [])
    crm_candidates = []
    print(f"[BOARDS] Found {len(boards)} boards:")
    for b in boards:
        name_lower = b["name"].lower()
        is_crm = any(kw in name_lower for kw in ["crm", "pipeline", "sales", "deal"])
        is_subitems = name_lower.startswith("subitems of")
        tag = " <- CRM BOARD" if (is_crm and not is_subitems) else (" <- CRM (subitems, skipped)" if (is_crm and is_subitems) else "")
        print(f"  {b['id']}: {b['name']} ({b['items_count']} items){tag}")
        if is_crm and not is_subitems:
            crm_candidates.append(b)
    # Pick the CRM board with the most items
    crm_board = max(crm_candidates, key=lambda x: x["items_count"]) if crm_candidates else None
    return boards, crm_board


def map_columns(board):
    """Map column IDs to their titles and types for field identification."""
    mapping = {}
    known_fields = {
        "stage": None, "arr": None, "owner": None, "close date": None,
        "close_date": None, "industry": None, "segment": None, "vertical": None,
        "agent family": None, "agent_family": None, "status": None,
    }
    print(f"\n[COLUMNS] Column mapping for board '{board['name']}':")
    for col in board.get("columns", []):
        col_id = col["id"]
        title = col["title"]
        col_type = col["type"]
        mapping[col_id] = {"title": title, "type": col_type}
        print(f"  {col_id}: {title} ({col_type})")

        # Try to match to known fields
        title_lower = title.lower().strip()
        for field_name in known_fields:
            if field_name in title_lower or title_lower in field_name:
                known_fields[field_name] = col_id

    # Also try common patterns — prefer numbers columns over formula columns for ARR
    arr_candidates = []
    for col in board.get("columns", []):
        title_lower = col["title"].lower()
        if "arr" in title_lower or "revenue" in title_lower or "value" in title_lower:
            arr_candidates.append(col)
    # Prefer numbers type over formula type for ARR
    if arr_candidates:
        numbers_arrs = [c for c in arr_candidates if c["type"] == "numbers"]
        if numbers_arrs:
            known_fields["arr"] = numbers_arrs[0]["id"]
        elif known_fields["arr"] is None:
            known_fields["arr"] = arr_candidates[0]["id"]

    for col in board.get("columns", []):
        title_lower = col["title"].lower()
        if "stage" in title_lower or "phase" in title_lower:
            if known_fields["stage"] is None:
                known_fields["stage"] = col["id"]
        if "owner" in title_lower or "rep" in title_lower or "salesperson" in title_lower or "lead" in title_lower:
            if known_fields["owner"] is None:
                known_fields["owner"] = col["id"]
        if "date" in title_lower and ("close" in title_lower or "target" in title_lower):
            if known_fields["close date"] is None:
                known_fields["close date"] = col["id"]
        if "industry" in title_lower or "segment" in title_lower or "vertical" in title_lower:
            for f in ["industry", "segment", "vertical"]:
                if known_fields[f] is None:
                    known_fields[f] = col["id"]
        if "agent" in title_lower and "family" in title_lower:
            if known_fields["agent family"] is None:
                known_fields["agent family"] = col["id"]

    print(f"\n[FIELD MAPPING] Known field -> column ID:")
    for field, col_id in known_fields.items():
        print(f"  {field}: {col_id or 'NOT FOUND'}")

    return mapping, known_fields


def fetch_all_items(board_id):
    """Fetch all items from a board with cursor-based pagination."""
    all_items = []
    # First page
    data = monday_query(f"""
    {{
        boards(ids: [{board_id}]) {{
            items_page(limit: 100) {{
                cursor
                items {{
                    id
                    name
                    group {{ id title }}
                    column_values {{ id text value type }}
                    subitems {{ id name column_values {{ id text value }} }}
                    created_at
                    updated_at
                }}
            }}
        }}
    }}
    """)
    boards_data = data.get("boards", [])
    if not boards_data:
        return all_items

    page = boards_data[0].get("items_page", {})
    items = page.get("items", [])
    cursor = page.get("cursor")
    all_items.extend(items)
    print(f"  Page 1: {len(items)} items (cursor={'yes' if cursor else 'none'})")

    # Subsequent pages
    page_num = 2
    while cursor:
        data = monday_query(f"""
        {{
            next_items_page(cursor: "{cursor}", limit: 100) {{
                cursor
                items {{
                    id
                    name
                    group {{ id title }}
                    column_values {{ id text value type }}
                    subitems {{ id name column_values {{ id text value }} }}
                    created_at
                    updated_at
                }}
            }}
        }}
        """)
        next_page = data.get("next_items_page", {})
        items = next_page.get("items", [])
        cursor = next_page.get("cursor")
        all_items.extend(items)
        print(f"  Page {page_num}: {len(items)} items")
        page_num += 1

    return all_items

# ---------------------------------------------------------------------------
# Data Processing
# ---------------------------------------------------------------------------

def get_column_value(item, col_id, column_mapping=None):
    """Get the text value of a specific column from an item."""
    for cv in item.get("column_values", []):
        if cv["id"] == col_id:
            # Try text first, then parse value JSON
            if cv.get("text"):
                return cv["text"]
            if cv.get("value"):
                try:
                    val = json.loads(cv["value"])
                    if isinstance(val, dict):
                        return val.get("text") or val.get("label") or str(val)
                    return str(val)
                except (json.JSONDecodeError, TypeError):
                    return cv["value"]
    return ""


def parse_arr(value_str):
    """Parse an ARR value string into a number."""
    if not value_str:
        return 0
    # Remove currency symbols, commas, spaces
    cleaned = re.sub(r"[^0-9.]", "", str(value_str))
    try:
        return float(cleaned)
    except ValueError:
        return 0


def get_stage_probability(stage_str):
    """Map a stage string to its probability."""
    if not stage_str:
        return 0
    stage_lower = stage_str.lower().strip()
    for key, prob in STAGE_PROBABILITIES.items():
        if key in stage_lower:
            return prob
    return 0.05  # default for unknown stages


def days_since(iso_string):
    """Return number of days since an ISO timestamp."""
    if not iso_string:
        return 999
    try:
        dt = datetime.fromisoformat(iso_string.replace("Z", "+00:00"))
        return (datetime.now(timezone.utc) - dt).days
    except Exception:
        return 999


def process_deals(items, known_fields, column_mapping):
    """Process raw Monday.com items into deal objects."""
    deals = []
    for item in items:
        stage_col = known_fields.get("stage")
        arr_col = known_fields.get("arr")
        owner_col = known_fields.get("owner")
        close_date_col = known_fields.get("close date") or known_fields.get("close_date")
        segment_col = known_fields.get("industry") or known_fields.get("segment") or known_fields.get("vertical")
        agent_family_col = known_fields.get("agent family") or known_fields.get("agent_family")

        stage = get_column_value(item, stage_col) if stage_col else ""
        arr_str = get_column_value(item, arr_col) if arr_col else ""
        owner = get_column_value(item, owner_col) if owner_col else ""
        close_date = get_column_value(item, close_date_col) if close_date_col else ""
        segment = get_column_value(item, segment_col) if segment_col else ""
        agent_family = get_column_value(item, agent_family_col) if agent_family_col else ""

        arr = parse_arr(arr_str)
        probability = get_stage_probability(stage)
        weighted_arr = round(arr * probability, 2)
        deal_age = days_since(item.get("created_at", ""))
        days_since_update = days_since(item.get("updated_at", ""))

        group = item.get("group", {})
        subitems = item.get("subitems", [])

        deals.append({
            "id": item["id"],
            "name": item["name"],
            "group": group.get("title", ""),
            "groupId": group.get("id", ""),
            "stage": stage,
            "arr": arr,
            "arrDisplay": arr_str,
            "weightedArr": weighted_arr,
            "probability": probability,
            "owner": owner,
            "closeDate": close_date,
            "segment": segment,
            "agentFamily": agent_family,
            "dealAge": deal_age,
            "daysSinceUpdate": days_since_update,
            "subitemCount": len(subitems),
            "createdAt": item.get("created_at", ""),
            "updatedAt": item.get("updated_at", ""),
        })
    return deals

# ---------------------------------------------------------------------------
# Analysis Functions
# ---------------------------------------------------------------------------

def pipeline_summary(deals):
    """Total accounts, raw ARR, weighted pipeline, won ARR."""
    total_arr = sum(d["arr"] for d in deals)
    weighted = sum(d["weightedArr"] for d in deals)
    won = sum(d["arr"] for d in deals if "won" in d["stage"].lower() or d["probability"] >= 0.90)
    return {
        "totalAccounts": len(deals),
        "totalRawArr": round(total_arr, 2),
        "weightedPipeline": round(weighted, 2),
        "wonArr": round(won, 2),
    }


def stage_funnel(deals):
    """Group by stage with weighted ARR."""
    stages = {}
    for d in deals:
        s = d["stage"] or "Unknown"
        if s not in stages:
            stages[s] = {"count": 0, "rawArr": 0, "weightedArr": 0, "probability": d["probability"]}
        stages[s]["count"] += 1
        stages[s]["rawArr"] += d["arr"]
        stages[s]["weightedArr"] += d["weightedArr"]
    # Round values
    for s in stages:
        stages[s]["rawArr"] = round(stages[s]["rawArr"], 2)
        stages[s]["weightedArr"] = round(stages[s]["weightedArr"], 2)
    return stages


def top_deals(deals, n=15):
    """Top N deals by ARR."""
    sorted_deals = sorted(deals, key=lambda d: d["arr"], reverse=True)
    return [
        {
            "name": d["name"],
            "arr": d["arr"],
            "stage": d["stage"],
            "owner": d["owner"],
            "dealAge": d["dealAge"],
            "subitemCount": d["subitemCount"],
        }
        for d in sorted_deals[:n]
    ]


def pipeline_by_owner(deals):
    """Group by owner/sales rep."""
    owners = {}
    for d in deals:
        o = d["owner"] or "Unassigned"
        if o not in owners:
            owners[o] = {"dealCount": 0, "totalArr": 0}
        owners[o]["dealCount"] += 1
        owners[o]["totalArr"] += d["arr"]
    for o in owners:
        owners[o]["totalArr"] = round(owners[o]["totalArr"], 2)
    return owners


def pipeline_by_segment(deals):
    """Group by segment/industry."""
    segments = {}
    for d in deals:
        s = d["segment"] or "Unknown"
        if s not in segments:
            segments[s] = {"accountCount": 0, "totalArr": 0}
        segments[s]["accountCount"] += 1
        segments[s]["totalArr"] += d["arr"]
    for s in segments:
        segments[s]["totalArr"] = round(segments[s]["totalArr"], 2)
    return segments


def at_risk_deals(deals):
    """Identify at-risk deals: expired close date, stale, missing data."""
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    expired = [d for d in deals if d["closeDate"] and d["closeDate"] < today and d["probability"] < 0.90]
    stale = [d for d in deals if d["daysSinceUpdate"] >= 365]
    missing_arr = [d for d in deals if d["arr"] == 0]
    missing_close = [d for d in deals if not d["closeDate"]]
    return {
        "expired": [{"name": d["name"], "closeDate": d["closeDate"], "arr": d["arr"]} for d in expired],
        "stale": [{"name": d["name"], "daysSinceUpdate": d["daysSinceUpdate"], "arr": d["arr"]} for d in stale],
        "missingArr": [{"name": d["name"], "stage": d["stage"]} for d in missing_arr],
        "missingCloseDate": [{"name": d["name"], "stage": d["stage"], "arr": d["arr"]} for d in missing_close],
    }


def data_quality_audit(deals):
    """Count data quality issues."""
    missing_arr = len([d for d in deals if d["arr"] == 0])
    missing_close = len([d for d in deals if not d["closeDate"]])
    missing_agent = len([d for d in deals if not d["agentFamily"]])
    stale_365 = len([d for d in deals if d["daysSinceUpdate"] >= 365])
    return {
        "missingArr": missing_arr,
        "missingCloseDate": missing_close,
        "missingAgentFamily": missing_agent,
        "stale365Days": stale_365,
        "totalDeals": len(deals),
    }


def strategic_account_summary(deals):
    """Summary for key strategic accounts."""
    results = {}
    for d in deals:
        name_lower = d["name"].lower()
        for acct in STRATEGIC_ACCOUNTS:
            if acct in name_lower:
                if acct not in results:
                    results[acct] = []
                results[acct].append({
                    "name": d["name"],
                    "arr": d["arr"],
                    "stage": d["stage"],
                    "owner": d["owner"],
                    "daysSinceUpdate": d["daysSinceUpdate"],
                })
                break
    return results

# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def run_extraction():
    """Run full Monday.com extraction pipeline."""
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    print("=" * 60)
    print(f"MONDAY.COM EXTRACTION -- {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 60)

    # Step 1: Discover boards
    print("\n[1/7] Discovering boards...")
    boards, crm_board = discover_boards()
    if not crm_board:
        print("[WARNING] No CRM/pipeline board found automatically.")
        if boards:
            print(f"  Using first board: {boards[0]['name']} (id={boards[0]['id']})")
            crm_board = boards[0]
        else:
            print("[ERROR] No boards found at all!")
            sys.exit(1)

    board_id = crm_board["id"]
    print(f"\n  Using board: {crm_board['name']} (id={board_id})")

    # Step 2: Map columns
    print("\n[2/7] Mapping columns...")
    column_mapping, known_fields = map_columns(crm_board)

    # Step 3: Fetch all items
    print(f"\n[3/7] Fetching items from board {board_id}...")
    items = fetch_all_items(board_id)
    print(f"  -> {len(items)} total items")

    # Step 4: Process into deals
    print("\n[4/7] Processing deals...")
    deals = process_deals(items, known_fields, column_mapping)
    print(f"  -> {len(deals)} deals processed")

    # Step 5: Run analysis
    print("\n[5/7] Running analysis...")
    summary = pipeline_summary(deals)
    print(f"  Total accounts: {summary['totalAccounts']}")
    print(f"  Raw ARR: ${summary['totalRawArr']:,.2f}")
    print(f"  Weighted pipeline: ${summary['weightedPipeline']:,.2f}")
    print(f"  Won ARR: ${summary['wonArr']:,.2f}")

    funnel = stage_funnel(deals)
    top = top_deals(deals)
    by_owner = pipeline_by_owner(deals)
    by_segment = pipeline_by_segment(deals)

    # Step 6: Risk & quality
    print("\n[6/7] At-risk deals & data quality...")
    risk = at_risk_deals(deals)
    quality = data_quality_audit(deals)
    print(f"  Expired close date: {len(risk['expired'])}")
    print(f"  Stale (365+ days): {len(risk['stale'])}")
    print(f"  Missing ARR: {quality['missingArr']}")
    print(f"  Missing close date: {quality['missingCloseDate']}")
    print(f"  Missing agent family: {quality['missingAgentFamily']}")

    # Step 7: Strategic accounts
    print("\n[7/7] Strategic account summary...")
    strategic = strategic_account_summary(deals)
    for acct, items_list in strategic.items():
        print(f"  {acct.title()}: {len(items_list)} deals, ${sum(d['arr'] for d in items_list):,.2f} ARR")

    # ---------------------------------------------------------------------------
    # Assemble output
    # ---------------------------------------------------------------------------
    output = {
        "extractionTimestamp": datetime.now(timezone.utc).isoformat(),
        "boardId": board_id,
        "boardName": crm_board["name"],
        "columnMapping": {cid: info for cid, info in column_mapping.items()},
        "knownFields": known_fields,
        "pipelineSummary": summary,
        "stageFunnel": funnel,
        "topDeals": top,
        "pipelineByOwner": by_owner,
        "pipelineBySegment": by_segment,
        "atRiskDeals": risk,
        "dataQualityAudit": quality,
        "strategicAccounts": strategic,
        "allDeals": deals,
    }

    # Save JSON
    json_path = OUTPUT_DIR / f"monday_extraction_{timestamp}.json"
    json_path.write_text(json.dumps(output, indent=2, default=str))
    latest_json = OUTPUT_DIR / "monday_extraction_latest.json"
    latest_json.write_text(json.dumps(output, indent=2, default=str))
    print(f"\n[JSON] {json_path}")

    # Save TXT
    txt_path = OUTPUT_DIR / f"monday_extraction_{timestamp}.txt"
    txt_lines = generate_text_report(output)
    txt_path.write_text("\n".join(txt_lines))
    latest_txt = OUTPUT_DIR / "monday_extraction_latest.txt"
    latest_txt.write_text("\n".join(txt_lines))
    print(f"[TXT]  {txt_path}")

    return output


def generate_text_report(data):
    """Generate human-readable text report."""
    lines = []
    lines.append("=" * 70)
    lines.append(f"MONDAY.COM PIPELINE REPORT -- {data['extractionTimestamp']}")
    lines.append(f"Board: {data['boardName']} (id={data['boardId']})")
    lines.append("=" * 70)

    s = data["pipelineSummary"]
    lines.append(f"\nPIPELINE SUMMARY:")
    lines.append(f"  Total accounts: {s['totalAccounts']}")
    lines.append(f"  Total raw ARR: ${s['totalRawArr']:,.2f}")
    lines.append(f"  Weighted pipeline: ${s['weightedPipeline']:,.2f}")
    lines.append(f"  Won ARR: ${s['wonArr']:,.2f}")

    lines.append(f"\nSTAGE FUNNEL:")
    for stage, info in sorted(data["stageFunnel"].items(), key=lambda x: -x[1]["rawArr"]):
        lines.append(f"  {stage}: {info['count']} deals, ${info['rawArr']:,.2f} raw, ${info['weightedArr']:,.2f} weighted ({info['probability']*100:.0f}%)")

    lines.append(f"\nTOP 15 DEALS BY ARR:")
    for i, d in enumerate(data["topDeals"], 1):
        lines.append(f"  {i}. {d['name']}: ${d['arr']:,.2f} | Stage: {d['stage']} | Owner: {d['owner']} | Age: {d['dealAge']}d | Subitems: {d['subitemCount']}")

    lines.append(f"\nPIPELINE BY OWNER:")
    for owner, info in sorted(data["pipelineByOwner"].items(), key=lambda x: -x[1]["totalArr"]):
        lines.append(f"  {owner}: {info['dealCount']} deals, ${info['totalArr']:,.2f}")

    lines.append(f"\nPIPELINE BY SEGMENT:")
    for seg, info in sorted(data["pipelineBySegment"].items(), key=lambda x: -x[1]["totalArr"]):
        lines.append(f"  {seg}: {info['accountCount']} accounts, ${info['totalArr']:,.2f}")

    risk = data["atRiskDeals"]
    lines.append(f"\nAT-RISK DEALS:")
    lines.append(f"  Expired close date: {len(risk['expired'])}")
    for d in risk["expired"][:10]:
        lines.append(f"    {d['name']}: close={d['closeDate']}, ${d['arr']:,.2f}")
    lines.append(f"  Stale (365+ days): {len(risk['stale'])}")
    for d in risk["stale"][:10]:
        lines.append(f"    {d['name']}: {d['daysSinceUpdate']} days, ${d['arr']:,.2f}")

    q = data["dataQualityAudit"]
    lines.append(f"\nDATA QUALITY AUDIT:")
    lines.append(f"  Missing ARR: {q['missingArr']}/{q['totalDeals']}")
    lines.append(f"  Missing close date: {q['missingCloseDate']}/{q['totalDeals']}")
    lines.append(f"  Missing agent family: {q['missingAgentFamily']}/{q['totalDeals']}")
    lines.append(f"  Stale 365+ days: {q['stale365Days']}/{q['totalDeals']}")

    lines.append(f"\nSTRATEGIC ACCOUNTS:")
    for acct, items in sorted(data["strategicAccounts"].items()):
        total_arr = sum(d["arr"] for d in items)
        lines.append(f"  {acct.title()} ({len(items)} deals, ${total_arr:,.2f} ARR):")
        for d in items:
            lines.append(f"    {d['name']}: ${d['arr']:,.2f} | {d['stage']} | {d['owner']} | {d['daysSinceUpdate']}d since update")

    lines.append("\n" + "=" * 70)
    lines.append("END OF REPORT")
    return lines


if __name__ == "__main__":
    run_extraction()
