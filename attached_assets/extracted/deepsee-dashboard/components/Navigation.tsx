import Image from 'next/image';

interface NavigationProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export default function Navigation({ activeView, onViewChange }: NavigationProps) {
  const views = [
    { id: 'executive', label: 'Executive Summary', icon: '📊' },
    { id: 'sales', label: 'Sales Pipeline', icon: '💰' },
    { id: 'engineering', label: 'Engineering', icon: '⚙️' },
    { id: 'product', label: 'Product Roadmap', icon: '🗺️' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <Image src="/logo.svg" alt="DeepSee AI" width={150} height={40} />
            <span className="text-gray-400 text-sm hidden md:inline">|</span>
            <span className="text-gray-600 text-sm font-medium hidden md:inline">
              Priority Dashboard
            </span>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1">
            {views.map((view) => (
              <button
                key={view.id}
                onClick={() => onViewChange(view.id)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  activeView === view.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{view.icon}</span>
                <span className="hidden sm:inline">{view.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
