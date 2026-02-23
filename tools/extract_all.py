#!/usr/bin/env python3
"""
Runner script for all DeepSee Dashboard extraction tools.

Usage:
    python3 extract_all.py           # Full extraction + reconciliation
    python3 extract_all.py jira      # JIRA only
    python3 extract_all.py monday    # Monday.com only
    python3 extract_all.py reconcile # Orphan check only
"""

import sys
import time
from datetime import datetime
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent


def run_jira():
    print("\n" + "=" * 60)
    print("RUNNING: JIRA Extraction")
    print("=" * 60)
    from jira_extract import run_extraction
    return run_extraction()


def run_monday():
    print("\n" + "=" * 60)
    print("RUNNING: Monday.com Extraction")
    print("=" * 60)
    from monday_extract import run_extraction
    return run_extraction()


def run_reconcile():
    print("\n" + "=" * 60)
    print("RUNNING: Ticket Reconciliation")
    print("=" * 60)
    from reconcile import run_reconciliation
    return run_reconciliation()


def main():
    start = time.time()
    mode = sys.argv[1].lower() if len(sys.argv) > 1 else "all"

    print(f"DeepSee Dashboard Extraction -- {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"Mode: {mode}")

    jira_result = None
    monday_result = None
    reconcile_result = None

    if mode in ("all", "jira"):
        try:
            jira_result = run_jira()
        except Exception as e:
            print(f"\n[ERROR] JIRA extraction failed: {e}")
            import traceback
            traceback.print_exc()

    if mode in ("all", "monday"):
        try:
            monday_result = run_monday()
        except Exception as e:
            print(f"\n[ERROR] Monday.com extraction failed: {e}")
            import traceback
            traceback.print_exc()

    if mode in ("all", "reconcile"):
        try:
            reconcile_result = run_reconcile()
        except Exception as e:
            print(f"\n[ERROR] Reconciliation failed: {e}")
            import traceback
            traceback.print_exc()

    elapsed = time.time() - start
    print("\n" + "=" * 60)
    print(f"EXTRACTION COMPLETE -- {elapsed:.1f}s")
    print("=" * 60)

    output_dir = SCRIPT_DIR / "output"
    print(f"\nOutput directory: {output_dir}")
    if output_dir.exists():
        for f in sorted(output_dir.iterdir()):
            if f.name.startswith("."):
                continue
            size = f.stat().st_size
            print(f"  {f.name} ({size:,} bytes)")

    print("\n" + "-" * 60)
    print("NEXT STEP: Feed the .txt outputs to Claude Code to update dashboard data files.")
    print("  Or run: python3 tools/update_dashboard.py (if available)")
    print("-" * 60)


if __name__ == "__main__":
    main()
