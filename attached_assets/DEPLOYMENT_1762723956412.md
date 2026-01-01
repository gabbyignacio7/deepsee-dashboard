# Deployment Instructions - DeepSee AI Priority Dashboard

## 🚀 Quick Deployment to Vercel (Recommended)

Vercel provides the easiest deployment for Next.js applications with zero configuration.

### Option 1: Deploy via Vercel CLI (Fastest)

1. **Install Vercel CLI** (if not already installed):
```bash
npm install -g vercel
```

2. **Navigate to project directory**:
```bash
cd deepsee-dashboard
```

3. **Deploy**:
```bash
vercel
```

4. **Follow the prompts**:
   - Set up and deploy: Yes
   - Which scope: Choose your account
   - Link to existing project: No
   - Project name: deepsee-priority-dashboard
   - Directory: ./ (current directory)
   - Override settings: No

5. **Production deployment**:
```bash
vercel --prod
```

6. **Done!** You'll receive a live URL like: `https://deepsee-priority-dashboard.vercel.app`

### Option 2: Deploy via Vercel Dashboard

1. **Push code to GitHub**:
```bash
git init
git add .
git commit -m "Initial commit - DeepSee Priority Dashboard"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. **Go to Vercel Dashboard**:
   - Visit https://vercel.com
   - Sign in with GitHub
   - Click "Add New Project"

3. **Import Repository**:
   - Select your GitHub repository
   - Click "Import"

4. **Configure Project**:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: ./
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `.next` (auto-filled)
   - **Install Command**: `npm install` (auto-filled)

5. **Deploy**:
   - Click "Deploy"
   - Wait 2-5 minutes for build to complete

6. **Access Dashboard**:
   - You'll receive a live URL
   - Share this URL with your team

### Vercel Environment Setup

**No environment variables required** - all data is loaded from static JSON files.

## 🌐 Alternative Deployment Options

### Option 3: Netlify

1. **Build the project locally**:
```bash
npm run build
npm run export  # For static export (optional)
```

2. **Deploy to Netlify**:
   - Go to https://app.netlify.com
   - Drag and drop the `.next` folder (or `out` folder if exported)
   - Or connect your GitHub repository

3. **Configure**:
   - Build command: `npm run build`
   - Publish directory: `.next`

### Option 4: Self-Hosted (AWS, DigitalOcean, etc.)

1. **Build production bundle**:
```bash
npm run build
```

2. **Start production server**:
```bash
npm start
```

3. **Configure reverse proxy** (nginx example):
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

4. **Use PM2 for process management**:
```bash
npm install -g pm2
pm2 start npm --name "deepsee-dashboard" -- start
pm2 save
pm2 startup
```

### Option 5: Docker Deployment

1. **Create Dockerfile** (already included in project):
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

2. **Build Docker image**:
```bash
docker build -t deepsee-dashboard .
```

3. **Run container**:
```bash
docker run -p 3000:3000 deepsee-dashboard
```

4. **Access at**: http://localhost:3000

## 🔄 Updating Data

### Updating Dashboard Data Files

1. **Prepare updated JSON files**:
   - `features.json` (47+ features)
   - `jira.json` (198+ tickets)
   - `sales.json` (16+ opportunities)

2. **Replace files in** `/public/data/`:
```bash
cp your-new-features.json public/data/features.json
cp your-new-jira.json public/data/jira.json
cp your-new-sales.json public/data/sales.json
```

3. **Redeploy**:

**If using Vercel**:
```bash
vercel --prod
```

**If self-hosted**:
```bash
npm run build
pm2 restart deepsee-dashboard
```

### Data Format Requirements

**Features (`features.json`)**:
```json
[
  {
    "Feature_ID": "F-001",
    "Feature_Name": "Feature Name",
    "Agent_Type": "Email Automation",
    "Category": "Platform Improvements",
    "Quarter_Planned": "Q4 2025",
    "Replicability_Score": 5,
    "Primary_Client": "Client Name",
    "ARR_Amount": 100000,
    "Conversion_Probability": 80,
    "Effort_Estimate_Weeks": 8,
    "Priority_Score": 50000,
    "Priority_Tier": "Tier 1: Fast Track",
    "Current_Status": "In Progress",
    "Completion_Percent": 25
    // ... other fields
  }
]
```

**JIRA Tickets (`jira.json`)**:
```json
[
  {
    "JIRA_Ticket_ID": "DS-001",
    "Title": "Ticket title",
    "Status": "In Progress",
    "Category": "Feature Development",
    "Client_Name": "Client Name",
    "Story_Points": 5,
    "Mapped_Feature_ID": "F-001"
  }
]
```

**Sales Opportunities (`sales.json`)**:
```json
[
  {
    "Opportunity_ID": "OPP-001",
    "Opportunity_Name": "Deal Name",
    "Account_Name": "Client Name",
    "Stage": "Proposal",
    "ARR_Value": 500000,
    "Probability": 60,
    "Mapped_Feature_ID": "F-001, F-002",
    "Weighted_ARR": 300000
  }
]
```

## 🔒 Security & Access Control

### Public vs Private Deployment

**Public Deployment** (default):
- Anyone with the URL can access
- Good for: Internal team sharing
- No authentication required

**Private Deployment** (optional):
Add authentication via:

1. **Vercel Authentication** (easiest):
```bash
vercel --prod --build-env PASSWORD=your-secure-password
```

2. **Next.js Middleware** (custom):
Create `middleware.ts`:
```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const basicAuth = request.headers.get('authorization');
  
  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    const [user, pwd] = atob(authValue).split(':');
    
    if (user === 'deepsee' && pwd === 'your-password') {
      return NextResponse.next();
    }
  }
  
  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}
```

## 📊 Performance Optimization

### Recommended Settings

**For Vercel**:
- Enable Edge Network (automatic)
- Enable Incremental Static Regeneration
- Use Vercel Analytics (optional)

**Caching**:
Data is loaded once on page load. For real-time updates, implement:
```javascript
// Refresh data every 5 minutes
setInterval(() => {
  window.location.reload();
}, 300000);
```

## 🐛 Troubleshooting

### Build Fails

**Issue**: `npm run build` fails
**Solution**:
1. Delete `node_modules` and `.next`: `rm -rf node_modules .next`
2. Reinstall dependencies: `npm install`
3. Rebuild: `npm run build`

### Data Not Loading

**Issue**: Dashboard shows "Loading..." indefinitely
**Solution**:
1. Check browser console for errors (F12)
2. Verify JSON files exist in `/public/data/`
3. Validate JSON syntax: https://jsonlint.com
4. Check file permissions (if self-hosted)

### Charts Not Rendering

**Issue**: Charts appear blank
**Solution**:
1. Ensure Recharts is installed: `npm install recharts`
2. Check if data arrays are empty
3. Verify viewport size (charts need minimum width)

### Deployment URL Issues

**Issue**: Vercel deployment shows 404
**Solution**:
1. Check Vercel dashboard for build logs
2. Ensure `vercel.json` is correctly configured
3. Verify `package.json` has correct build scripts

## 📈 Monitoring & Analytics

### Add Vercel Analytics

1. In Vercel dashboard, go to your project
2. Click "Analytics" tab
3. Enable Web Analytics
4. Add to `app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Custom Tracking

Add Google Analytics, Mixpanel, or other analytics tools by adding scripts to `app/layout.tsx`.

## 🔄 Continuous Deployment

### Automatic Deployments

**With Vercel + GitHub**:
1. Connect your GitHub repository to Vercel
2. Every push to `main` branch automatically deploys
3. Pull requests create preview deployments

**Webhook Integration**:
Set up webhooks to auto-deploy when data is updated:
1. Go to Vercel project settings
2. Add Deploy Hook
3. Use webhook URL in your data update workflow

## 📞 Support

**Deployment Issues**:
- Vercel Support: https://vercel.com/support
- Next.js Docs: https://nextjs.org/docs

**Dashboard Issues**:
- Contact Connor (Chief Architect)
- GitHub Issues (if repository is set up)

---

**Estimated Deployment Time**: 10-15 minutes (Vercel)
**Estimated Monthly Cost**: $0 (Vercel Hobby plan, sufficient for team use)
