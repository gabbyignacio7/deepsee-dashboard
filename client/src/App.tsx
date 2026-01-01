import { Switch, Route, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DashboardProvider } from "@/components/dashboard-context";
import Navigation from "@/components/Navigation";
import ExecutiveDashboard from "@/pages/executive";
import SalesDashboard from "@/pages/sales";
import EngineeringDashboard from "@/pages/engineering";
import ProductRoadmap from "@/pages/product";
import BoardView from "@/pages/board";
import PlatformArchitecture from "@/pages/platform-architecture";
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
          <Route path="/board" component={BoardView} />
          <Route path="/architecture" component={PlatformArchitecture} />
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
        <WouterRouter base={BASE_PATH}>
          <DashboardProvider>
            <Toaster />
            <AppRouter />
          </DashboardProvider>
        </WouterRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
