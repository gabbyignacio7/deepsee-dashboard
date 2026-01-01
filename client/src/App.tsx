import { Switch, Route } from "wouter";
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

function Router() {
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
        <DashboardProvider>
          <Toaster />
          <Router />
        </DashboardProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
