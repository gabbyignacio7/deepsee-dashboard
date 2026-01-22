# deepsee-dashboard
Executive Product Dashboard

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Data Sources

The dashboard aggregates data from multiple systems. See **[DATA_SOURCES.md](./DATA_SOURCES.md)** for complete documentation on:

- How each data feed is collected
- File locations and schemas
- Update procedures
- Automation plans

**Quick Reference:**
| Source | File | Update Frequency |
|--------|------|------------------|
| JIRA | `client/src/data/sprintData.ts` | As-needed |
| Monday.com | `client/src/data/mondaySalesPipelineData.ts` | Weekly |
| Roadmap | `client/src/data/roadmapData.ts` | As-needed |

## Project Structure

```
├── client/          # Frontend React application
│   └── src/
│       ├── components/  # React components
│       ├── data/        # Data files (see DATA_SOURCES.md)
│       └── pages/       # Page components
├── server/          # Backend server
├── shared/          # Shared types and utilities
└── scripts/         # Build and utility scripts
```
