import { Link, useLocation } from 'wouter';
import { BarChart2, DollarSign, Settings, Map, Presentation, Layers, LogOut, type LucideIcon } from 'lucide-react';
import logoImage from '@assets/image_1762727809845.png';

interface NavView {
  id: string;
  label: string;
  icon: LucideIcon;
  path: string;
}

export default function Navigation() {
  const [location] = useLocation();

  const views: NavView[] = [
    { id: 'executive', label: 'Executive Summary', icon: BarChart2, path: '/executive' },
    { id: 'sales', label: 'Sales Pipeline', icon: DollarSign, path: '/sales' },
    { id: 'engineering', label: 'Engineering', icon: Settings, path: '/engineering' },
    { id: 'product', label: 'Product Roadmap', icon: Map, path: '/product' },
    { id: 'board', label: 'Board View', icon: Presentation, path: '/board' },
    { id: 'architecture', label: 'Architecture', icon: Layers, path: '/architecture' },
  ];

  const isActive = (path: string) => location === path || (path === '/executive' && location === '/');

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.location.reload();
    } catch (err) {
      console.error('Logout failed:', err);
      window.location.reload();
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <img 
              src={logoImage} 
              alt="DeepSee AI" 
              className="h-8" 
              data-testid="logo"
            />
            <span className="text-gray-400 text-sm hidden md:inline">|</span>
            <span className="text-gray-600 text-sm font-medium hidden md:inline">
              Priority Dashboard
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              {views.map((view) => {
                const Icon = view.icon;
                return (
                  <Link
                    key={view.id}
                    href={view.path}
                    data-testid={`link-${view.id}`}
                  >
                    <button
                      className={`flex items-center px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                        isActive(view.path)
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                      data-testid={`button-nav-${view.id}`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      <span className="hidden sm:inline">{view.label}</span>
                    </button>
                  </Link>
                );
              })}
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all"
              data-testid="button-logout"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline ml-2">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
