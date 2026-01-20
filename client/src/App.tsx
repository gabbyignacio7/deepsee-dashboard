import { Switch, Route, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DashboardProvider } from "@/components/dashboard-context";
import PasswordProtection from "@/components/PasswordProtection";
import Navigation from "@/components/Navigation";
import ExecutiveDashboard from "@/pages/executive";
import SalesDashboard from "@/pages/sales";
import EngineeringDashboard from "@/pages/engineering";
import ProductRoadmap from "@/pages/product";
import RoadmapPage from "@/pages/roadmap";
import BoardView from "@/pages/board";
import PlatformArchitecture from "@/pages/platform-architecture";
import ArtemisArchitecture from "@/pages/artemis-architecture";
import AgentFamilies from "@/pages/agent-families";
import ArtemisInitiative from "@/pages/artemis-initiative";
import FeatureDetail from "@/pages/feature-detail";
import NotFound from "@/pages/not-found";

// Get base path from Vite config for GitHub Pages
const BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, '') || '';

function AppRouter() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container mx-auto px-4 py-6">
        <Switch>
          <Route path="/" component={ExecutiveDashboard} />
          <Route path="/executive" component={ExecutiveDashboard} />
          <Route path="/sales" component={SalesDashboard} />
          <Route path="/engineering" component={EngineeringDashboard} />
          <Route path="/product" component={ProductRoadmap} />
          <Route path="/roadmap" component={RoadmapPage} />
          <Route path="/board" component={BoardView} />
          <Route path="/architecture" component={PlatformArchitecture} />
          <Route path="/artemis" component={ArtemisArchitecture} />
          <Route path="/agents" component={AgentFamilies} />
          <Route path="/initiative" component={ArtemisInitiative} />
          <Route path="/feature/:id" component={FeatureDetail} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <PasswordProtection>
          <WouterRouter base={BASE_PATH}>
            <DashboardProvider>
              <Toaster />
              <AppRouter />
            </DashboardProvider>
          </WouterRouter>
        </PasswordProtection>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
