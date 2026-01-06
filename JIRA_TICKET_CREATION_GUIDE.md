# JIRA Ticket Creation Guide - Platform & Fabric PRDs
**Date:** January 5, 2026
**Created By:** Claude Code
**For:** Browser Agent JIRA Creation

---

## STEP 1: CREATE PLATFORM EPIC

Go to: https://deepsee.atlassian.net/jira/software/projects/BACK/boards

### Epic Details:
- **Issue Type:** Epic
- **Summary:** Platform Infrastructure - ARTEMIS Foundation
- **Description:**
```
**PRD:** [Platform PRD](https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2823847948)

**Overview:**
Platform is the foundational infrastructure layer of ARTEMIS providing communication, storage, and processing capabilities for all agents.

**Key Components:**
- Message Bus (DeepSee Service Fabric) - Apache Kafka-based event streaming
- Data Layer - Information Graph, Vector Store, Document Store
- Compute Layer - Kubernetes-orchestrated container workloads
- Integration Layer - API Gateway, Connector Framework, MCP Adapter
- Resilience & Self-Healing - Circuit breakers, auto-restart, health monitoring

**Success Metrics:**
- Agent outcome processing time: <30 seconds (target)
- Self-healing success rate: >95%
- New connector development time: <2 weeks

**Implementation Timeline:**
- 2026-S2 (Jan 6-17): 13 tickets, 75 story points
- 2026-S3 (Jan 20-31): 9 tickets, 52 story points

**Total:** 22 tickets, 127 story points
```
- **Labels:** `platform`, `artemis`, `infrastructure`, `prd`

**Note the Epic key (e.g., BACK-1699) for linking stories below.**

---

## STEP 2: CREATE PLATFORM STORIES

For each story below, use these settings:
- **Issue Type:** Story
- **Epic Link:** [Platform Epic key from Step 1]
- **Labels:** `platform`, `artemis`

---

### SPRINT 2026-S2 TICKETS (13 tickets, 75 points)

#### Ticket 1: Kafka Message Bus
- **Summary:** [PLATFORM] Implement Kafka-based message bus for agent communication
- **Story Points:** 8
- **Priority:** High
- **Sprint:** 2026-S2
- **Description:**
```
**PRD:** [Platform PRD](https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2823847948)

**Description:**
Set up Apache Kafka infrastructure for standardized inter-agent messaging. Include topic configuration, partitioning strategy, and retention policies.

**Acceptance Criteria:**
- [ ] Kafka cluster configured and running
- [ ] Topic naming convention established
- [ ] Partitioning strategy documented
- [ ] Retention policies configured
- [ ] Unit tests passing
- [ ] Integration tests passing
- [ ] Documentation updated
- [ ] Code reviewed
```

---

#### Ticket 2: Agent Message Schema
- **Summary:** [PLATFORM] Create agent message schema and contracts
- **Story Points:** 5
- **Priority:** High
- **Sprint:** 2026-S2
- **Description:**
```
**PRD:** [Platform PRD](https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2823847948)

**Description:**
Define standardized message formats for agent-to-agent and agent-to-system communication. Include versioning strategy.

**Acceptance Criteria:**
- [ ] Message schema defined (Avro/Protobuf)
- [ ] Versioning strategy documented
- [ ] Schema registry configured
- [ ] Backward compatibility ensured
- [ ] Unit tests passing
- [ ] Documentation updated
- [ ] Code reviewed
```

---

#### Ticket 3: Dead Letter Queue
- **Summary:** [PLATFORM] Implement dead letter queue handling
- **Story Points:** 5
- **Priority:** Medium
- **Sprint:** 2026-S2
- **Description:**
```
**PRD:** [Platform PRD](https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2823847948)

**Description:**
Create DLQ infrastructure for failed message processing with alerting and retry mechanisms.

**Acceptance Criteria:**
- [ ] DLQ topics created
- [ ] Retry logic implemented
- [ ] Alerting configured
- [ ] Monitoring dashboard updated
- [ ] Unit tests passing
- [ ] Documentation updated
- [ ] Code reviewed
```

---

#### Ticket 4: Information Graph Infrastructure
- **Summary:** [PLATFORM] Information Graph enhanced infrastructure
- **Story Points:** 13
- **Priority:** High
- **Sprint:** 2026-S2
- **Description:**
```
**PRD:** [Platform PRD](https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2823847948)

**Description:**
Upgrade Information Graph storage and query capabilities for improved relationship mapping.

**Acceptance Criteria:**
- [ ] Graph database optimized
- [ ] Query performance improved
- [ ] Relationship mapping enhanced
- [ ] Integration with agents verified
- [ ] Unit tests passing
- [ ] Performance benchmarks met
- [ ] Documentation updated
- [ ] Code reviewed
```

---

#### Ticket 5: Vector Store Optimization
- **Summary:** [PLATFORM] Vector Store optimization for embeddings
- **Story Points:** 8
- **Priority:** High
- **Sprint:** 2026-S2
- **Description:**
```
**PRD:** [Platform PRD](https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2823847948)

**Description:**
Optimize vector storage for faster similarity search and retrieval. Azure AI Search integration.

**Acceptance Criteria:**
- [ ] Vector indexing optimized
- [ ] Azure AI Search integrated
- [ ] Search latency reduced
- [ ] Embedding quality verified
- [ ] Unit tests passing
- [ ] Performance benchmarks met
- [ ] Documentation updated
- [ ] Code reviewed
```

---

#### Ticket 6: Data Partitioning
- **Summary:** [PLATFORM] Implement data partitioning strategy
- **Story Points:** 8
- **Priority:** High
- **Sprint:** 2026-S2
- **Description:**
```
**PRD:** [Platform PRD](https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2823847948)

**Description:**
Design and implement multi-tenant data partitioning for client isolation.

**Acceptance Criteria:**
- [ ] Partitioning strategy defined
- [ ] Client isolation verified
- [ ] Data migration plan created
- [ ] Performance impact assessed
- [ ] Unit tests passing
- [ ] Security review passed
- [ ] Documentation updated
- [ ] Code reviewed
```

---

#### Ticket 7: K8s Autoscaling
- **Summary:** [PLATFORM] Kubernetes workload autoscaling configuration
- **Story Points:** 5
- **Priority:** High
- **Sprint:** 2026-S2
- **Description:**
```
**PRD:** [Platform PRD](https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2823847948)

**Description:**
Configure HPA and VPA for dynamic resource allocation based on agent workload.

**Acceptance Criteria:**
- [ ] HPA configured for all agents
- [ ] VPA configured where applicable
- [ ] Scaling thresholds tuned
- [ ] Cost impact analyzed
- [ ] Unit tests passing
- [ ] Load testing passed
- [ ] Documentation updated
- [ ] Code reviewed
```

---

#### Ticket 8: Container Health Monitoring
- **Summary:** [PLATFORM] Implement agent container health monitoring
- **Story Points:** 3
- **Priority:** Medium
- **Sprint:** 2026-S2
- **Description:**
```
**PRD:** [Platform PRD](https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2823847948)

**Description:**
Add health checks, readiness probes, and liveness probes for all agent containers.

**Acceptance Criteria:**
- [ ] Health checks implemented
- [ ] Readiness probes configured
- [ ] Liveness probes configured
- [ ] Alerting integrated
- [ ] Unit tests passing
- [ ] Documentation updated
- [ ] Code reviewed
```

---

#### Ticket 9: API Gateway Rate Limiting
- **Summary:** [PLATFORM] API Gateway rate limiting implementation
- **Story Points:** 5
- **Priority:** High
- **Sprint:** 2026-S2
- **Description:**
```
**PRD:** [Platform PRD](https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2823847948)

**Description:**
Implement per-client rate limiting with configurable thresholds.

**Acceptance Criteria:**
- [ ] Rate limiting configured
- [ ] Per-client limits set
- [ ] Override mechanism available
- [ ] Monitoring in place
- [ ] Unit tests passing
- [ ] Load testing passed
- [ ] Documentation updated
- [ ] Code reviewed
```

---

#### Ticket 10: Connector Framework
- **Summary:** [PLATFORM] Connector Framework base implementation
- **Story Points:** 13
- **Priority:** High
- **Sprint:** 2026-S2
- **Description:**
```
**PRD:** [Platform PRD](https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2823847948)

**Description:**
Create extensible framework for building new system connectors.

**Acceptance Criteria:**
- [ ] Base connector interface defined
- [ ] Authentication module created
- [ ] Error handling standardized
- [ ] Logging and metrics integrated
- [ ] Sample connector implemented
- [ ] Unit tests passing
- [ ] Documentation updated
- [ ] Code reviewed
```

---

#### Ticket 11: OAuth 2.0 Client Credentials
- **Summary:** [PLATFORM] OAuth 2.0 client credential flow for APIs
- **Story Points:** 5
- **Priority:** Medium
- **Sprint:** 2026-S2
- **Description:**
```
**PRD:** [Platform PRD](https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2823847948)

**Description:**
Implement secure API authentication for external system integrations.

**Acceptance Criteria:**
- [ ] OAuth 2.0 flow implemented
- [ ] Token management configured
- [ ] Scope management defined
- [ ] Security review passed
- [ ] Unit tests passing
- [ ] Integration tests passing
- [ ] Documentation updated
- [ ] Code reviewed
```

---

#### Ticket 12: Circuit Breaker Pattern
- **Summary:** [PLATFORM] Implement circuit breaker pattern for external calls
- **Story Points:** 5
- **Priority:** High
- **Sprint:** 2026-S2
- **Description:**
```
**PRD:** [Platform PRD](https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2823847948)

**Description:**
Add circuit breakers to prevent cascade failures from external system outages.

**Acceptance Criteria:**
- [ ] Circuit breaker library integrated
- [ ] Thresholds configured
- [ ] Fallback behavior defined
- [ ] Monitoring in place
- [ ] Unit tests passing
- [ ] Chaos testing passed
- [ ] Documentation updated
- [ ] Code reviewed
```

---

### SPRINT 2026-S3 TICKETS (9 tickets, 52 points)

#### Ticket 13: Message Routing
- **Summary:** [PLATFORM] Build message routing and orchestration layer
- **Story Points:** 8
- **Priority:** Medium
- **Sprint:** 2026-S3
- **Description:**
```
**PRD:** [Platform PRD](https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2823847948)

**Description:**
Implement intelligent message routing based on agent capabilities and availability.

**Acceptance Criteria:**
- [ ] Routing logic implemented
- [ ] Agent capability registry created
- [ ] Load balancing configured
- [ ] Failover handling defined
- [ ] Unit tests passing
- [ ] Integration tests passing
- [ ] Documentation updated
- [ ] Code reviewed
```

---

#### Ticket 14: Message Tracing
- **Summary:** [PLATFORM] Add message tracing and correlation IDs
- **Story Points:** 5
- **Priority:** Medium
- **Sprint:** 2026-S3
- **Description:**
```
**PRD:** [Platform PRD](https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2823847948)

**Description:**
Implement end-to-end message tracing for debugging and audit purposes.

**Acceptance Criteria:**
- [ ] Correlation IDs implemented
- [ ] Trace propagation working
- [ ] Logging integrated
- [ ] Search capability added
- [ ] Unit tests passing
- [ ] Documentation updated
- [ ] Code reviewed
```

---

#### Ticket 15: Document Store Indexing
- **Summary:** [PLATFORM] Document Store indexing improvements
- **Story Points:** 5
- **Priority:** Medium
- **Sprint:** 2026-S3
- **Description:**
```
**PRD:** [Platform PRD](https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2823847948)

**Description:**
Enhance document storage with better indexing for full-text search and metadata queries.

**Acceptance Criteria:**
- [ ] Indexing strategy optimized
- [ ] Full-text search improved
- [ ] Metadata queries enhanced
- [ ] Performance benchmarks met
- [ ] Unit tests passing
- [ ] Documentation updated
- [ ] Code reviewed
```

---

#### Ticket 16: Data Lifecycle Management
- **Summary:** [PLATFORM] Create data lifecycle management policies
- **Story Points:** 5
- **Priority:** Medium
- **Sprint:** 2026-S3
- **Description:**
```
**PRD:** [Platform PRD](https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2823847948)

**Description:**
Implement retention, archival, and purge policies for regulatory compliance.

**Acceptance Criteria:**
- [ ] Retention policies defined
- [ ] Archival process implemented
- [ ] Purge automation created
- [ ] Compliance requirements met
- [ ] Audit logging in place
- [ ] Documentation updated
- [ ] Code reviewed
```

---

#### Ticket 17: GPU Resource Allocation
- **Summary:** [PLATFORM] GPU resource allocation for LLM inference
- **Story Points:** 8
- **Priority:** High
- **Sprint:** 2026-S3
- **Description:**
```
**PRD:** [Platform PRD](https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2823847948)

**Description:**
Configure GPU scheduling for inference workloads with fair-share policies.

**Acceptance Criteria:**
- [ ] GPU scheduling configured
- [ ] Fair-share policies implemented
- [ ] Cost monitoring in place
- [ ] Performance benchmarks met
- [ ] Unit tests passing
- [ ] Documentation updated
- [ ] Code reviewed
```

---

#### Ticket 18: Compute Cost Dashboard
- **Summary:** [PLATFORM] Create compute cost monitoring dashboard
- **Story Points:** 5
- **Priority:** Low
- **Sprint:** 2026-S3
- **Description:**
```
**PRD:** [Platform PRD](https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2823847948)

**Description:**
Build Azure cost monitoring with per-agent and per-client attribution.

**Acceptance Criteria:**
- [ ] Cost dashboard created
- [ ] Per-agent attribution working
- [ ] Per-client attribution working
- [ ] Alerting configured
- [ ] Trend analysis available
- [ ] Documentation updated
- [ ] Code reviewed
```

---

#### Ticket 19: MCP Adapter
- **Summary:** [PLATFORM] MCP (Model Context Protocol) adapter
- **Story Points:** 13
- **Priority:** High
- **Sprint:** 2026-S3
- **Description:**
```
**PRD:** [Platform PRD](https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2823847948)

**Description:**
Implement MCP adapter for Microsoft Copilot integration.

**Acceptance Criteria:**
- [ ] MCP protocol implemented
- [ ] Copilot integration working
- [ ] Context passing verified
- [ ] Security review passed
- [ ] Unit tests passing
- [ ] Integration tests passing
- [ ] Documentation updated
- [ ] Code reviewed
```

---

#### Ticket 20: Webhook Delivery
- **Summary:** [PLATFORM] Webhook delivery and retry mechanism
- **Story Points:** 5
- **Priority:** Medium
- **Sprint:** 2026-S3
- **Description:**
```
**PRD:** [Platform PRD](https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2823847948)

**Description:**
Build reliable webhook delivery with exponential backoff retry.

**Acceptance Criteria:**
- [ ] Webhook delivery implemented
- [ ] Retry mechanism working
- [ ] Exponential backoff configured
- [ ] Dead letter handling in place
- [ ] Unit tests passing
- [ ] Documentation updated
- [ ] Code reviewed
```

---

#### Ticket 21: Self-Healing Agent Restart
- **Summary:** [PLATFORM] Self-healing agent restart logic
- **Story Points:** 8
- **Priority:** High
- **Sprint:** 2026-S3
- **Description:**
```
**PRD:** [Platform PRD](https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2823847948)

**Description:**
Implement automatic agent restart on failure detection with state recovery.

**Acceptance Criteria:**
- [ ] Failure detection implemented
- [ ] Auto-restart working
- [ ] State recovery configured
- [ ] Restart limits set
- [ ] Alerting in place
- [ ] Unit tests passing
- [ ] Chaos testing passed
- [ ] Documentation updated
- [ ] Code reviewed
```

---

#### Ticket 22: Platform Health Dashboard
- **Summary:** [PLATFORM] Create platform health dashboard
- **Story Points:** 5
- **Priority:** Medium
- **Sprint:** 2026-S3
- **Description:**
```
**PRD:** [Platform PRD](https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2823847948)

**Description:**
Build real-time health monitoring dashboard for all platform components.

**Acceptance Criteria:**
- [ ] Health dashboard created
- [ ] All components monitored
- [ ] Real-time updates working
- [ ] Alerting integrated
- [ ] Historical data available
- [ ] Documentation updated
- [ ] Code reviewed
```

---

## STEP 3: CREATE FABRIC EPIC

### Epic Details:
- **Issue Type:** Epic
- **Summary:** DeepSee Fabric Integration - Microsoft Ecosystem
- **Description:**
```
**PRD:** [DeepSee Fabric PRD](https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2825879553)

**Overview:**
Integration with Microsoft Fabric to leverage unified data analytics, lakehouse storage, and Power BI capabilities within the DeepSee platform.

**Key Components:**
- Fabric Workspace configuration
- Lakehouse integration for document storage
- Data Pipelines for ETL workflows
- Power BI embedded analytics
- Real-Time Analytics for event streams
- OneLake data sync

**Success Metrics:**
- Data sync latency: <5 minutes
- Dashboard load time: <3 seconds
- Client adoption of Fabric analytics: 50%+ by Q3 2026

**Dependencies:**
- Platform Infrastructure (Message Bus, Data Layer)
- Azure subscription with Fabric capacity

**Implementation Timeline:**
- 2026-S2 (Jan 6-17): 3 tickets, 18 story points
- 2026-S3 (Jan 20-31): 5 tickets, 32 story points

**Total:** 8 tickets, 50 story points
```
- **Labels:** `fabric`, `microsoft`, `integration`, `analytics`, `prd`

**Note the Epic key (e.g., BACK-1729) for linking stories below.**

---

## STEP 4: CREATE FABRIC STORIES

For each story below, use these settings:
- **Issue Type:** Story
- **Epic Link:** [Fabric Epic key from Step 3]
- **Labels:** `fabric`, `microsoft`

---

### SPRINT 2026-S2 TICKETS (3 tickets, 18 points)

#### Ticket 23: Fabric Workspace Setup
- **Summary:** [FABRIC] Microsoft Fabric workspace setup
- **Story Points:** 5
- **Priority:** High
- **Sprint:** 2026-S2
- **Description:**
```
**PRD:** [DeepSee Fabric PRD](https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2825879553)

**Description:**
Configure Fabric workspace for DeepSee with proper permissions and data boundaries.

**Acceptance Criteria:**
- [ ] Workspace created
- [ ] Permissions configured
- [ ] Data boundaries defined
- [ ] Security review passed
- [ ] Documentation updated
- [ ] Code reviewed
```

---

#### Ticket 24: Lakehouse Integration
- **Summary:** [FABRIC] Fabric Lakehouse integration for document storage
- **Story Points:** 8
- **Priority:** High
- **Sprint:** 2026-S2
- **Description:**
```
**PRD:** [DeepSee Fabric PRD](https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2825879553)

**Description:**
Connect document storage to Fabric Lakehouse for unified data analytics.

**Acceptance Criteria:**
- [ ] Lakehouse connected
- [ ] Data sync working
- [ ] Schema defined
- [ ] Query performance verified
- [ ] Unit tests passing
- [ ] Documentation updated
- [ ] Code reviewed
```

---

#### Ticket 25: Row-Level Security
- **Summary:** [FABRIC] Fabric row-level security for multi-tenancy
- **Story Points:** 5
- **Priority:** High
- **Sprint:** 2026-S2
- **Description:**
```
**PRD:** [DeepSee Fabric PRD](https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2825879553)

**Description:**
Implement RLS in Fabric for client data isolation.

**Acceptance Criteria:**
- [ ] RLS policies defined
- [ ] Client isolation verified
- [ ] Testing complete
- [ ] Security review passed
- [ ] Documentation updated
- [ ] Code reviewed
```

---

### SPRINT 2026-S3 TICKETS (5 tickets, 32 points)

#### Ticket 26: Data Pipeline
- **Summary:** [FABRIC] Fabric Data Pipeline for ETL workflows
- **Story Points:** 8
- **Priority:** Medium
- **Sprint:** 2026-S3
- **Description:**
```
**PRD:** [DeepSee Fabric PRD](https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2825879553)

**Description:**
Create data pipelines for moving data between DeepSee agents and Fabric.

**Acceptance Criteria:**
- [ ] Pipelines created
- [ ] Data flow verified
- [ ] Error handling implemented
- [ ] Monitoring in place
- [ ] Unit tests passing
- [ ] Documentation updated
- [ ] Code reviewed
```

---

#### Ticket 27: Power BI Dashboards
- **Summary:** [FABRIC] Power BI embedded dashboards
- **Story Points:** 8
- **Priority:** Medium
- **Sprint:** 2026-S3
- **Description:**
```
**PRD:** [DeepSee Fabric PRD](https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2825879553)

**Description:**
Integrate Power BI dashboards for client-facing analytics within DeepSee UI.

**Acceptance Criteria:**
- [ ] Dashboards created
- [ ] Embedding working
- [ ] Client access configured
- [ ] Performance optimized
- [ ] Unit tests passing
- [ ] Documentation updated
- [ ] Code reviewed
```

---

#### Ticket 28: Real-Time Analytics
- **Summary:** [FABRIC] Fabric Real-Time Analytics integration
- **Story Points:** 5
- **Priority:** Low
- **Sprint:** 2026-S3
- **Description:**
```
**PRD:** [DeepSee Fabric PRD](https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2825879553)

**Description:**
Connect agent event streams to Fabric Real-Time Analytics.

**Acceptance Criteria:**
- [ ] Event stream connected
- [ ] Real-time queries working
- [ ] Dashboards updated
- [ ] Performance verified
- [ ] Documentation updated
- [ ] Code reviewed
```

---

#### Ticket 29: OneLake Sync
- **Summary:** [FABRIC] OneLake data sync for Information Graph
- **Story Points:** 8
- **Priority:** Medium
- **Sprint:** 2026-S3
- **Description:**
```
**PRD:** [DeepSee Fabric PRD](https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2825879553)

**Description:**
Implement bidirectional sync between Information Graph and OneLake.

**Acceptance Criteria:**
- [ ] Sync configured
- [ ] Bidirectional flow working
- [ ] Conflict resolution defined
- [ ] Performance verified
- [ ] Unit tests passing
- [ ] Documentation updated
- [ ] Code reviewed
```

---

#### Ticket 30: Audit Logging
- **Summary:** [FABRIC] Fabric audit logging integration
- **Story Points:** 3
- **Priority:** Medium
- **Sprint:** 2026-S3
- **Description:**
```
**PRD:** [DeepSee Fabric PRD](https://deepsee.atlassian.net/wiki/spaces/PROD/pages/2825879553)

**Description:**
Connect Fabric audit logs to DeepSee compliance dashboard.

**Acceptance Criteria:**
- [ ] Audit logs connected
- [ ] Dashboard integration working
- [ ] Compliance requirements met
- [ ] Documentation updated
- [ ] Code reviewed
```

---

## VERIFICATION JQL

After creating all tickets, run this JQL to verify:

```
project = BACK AND labels in (platform, fabric) AND Sprint in ("2026-S2", "2026-S3") ORDER BY Sprint ASC, priority DESC
```

**Expected Results:**
- Platform: 22 tickets (BACK-1700 to BACK-1721)
- Fabric: 8 tickets (BACK-1730 to BACK-1737)
- Total: 30 tickets

---

## SUMMARY

| Epic | Tickets | Story Points | S2 Tickets | S2 Points | S3 Tickets | S3 Points |
|------|---------|--------------|------------|-----------|------------|-----------|
| Platform Infrastructure | 22 | 127 | 13 | 75 | 9 | 52 |
| DeepSee Fabric Integration | 8 | 50 | 3 | 18 | 5 | 32 |
| **TOTAL** | **30** | **177** | **16** | **93** | **14** | **84** |
