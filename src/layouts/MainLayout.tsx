import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

export const MainLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-neutral-50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-white border-r border-neutral-200 transition-all duration-base flex flex-col`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-lg border-b border-neutral-200">
          <div className={`${!sidebarOpen && 'hidden'} flex items-center gap-md`}>
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">ك</span>
            </div>
            <span className="font-semibold text-neutral-900">KASHKHATI</span>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-xs hover:bg-neutral-100 rounded-md transition-colors"
            aria-label="Toggle sidebar"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-md py-lg space-y-md overflow-y-auto">
          <NavLink icon="🏠" label="Home" to="/" open={sidebarOpen} />
          <NavLink icon="📝" label="Quiz" to="/quiz" open={sidebarOpen} />
          <NavLink icon="🎨" label="Avatar" to="/avatar" open={sidebarOpen} />
          <NavLink icon="📚" label="Library" to="/library" open={sidebarOpen} />
          <NavLink icon="✨" label="Blueprint" to="/blueprint" open={sidebarOpen} />
          <NavLink icon="🎬" label="AI Studio" to="/studio" open={sidebarOpen} />
        </nav>

        {/* User Section */}
        <div className="border-t border-neutral-200 p-lg space-y-md">
          <NavLink icon="👤" label="Profile" to="/profile" open={sidebarOpen} />
          <NavLink icon="⚙️" label="Settings" to="/settings" open={sidebarOpen} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-neutral-200 px-lg py-md flex items-center justify-between">
          <h1 className="text-2xl font-bold text-neutral-900">KASHKHATI</h1>
          <div className="flex items-center gap-lg">
            <button className="p-md hover:bg-neutral-100 rounded-md transition-colors">
              🔔
            </button>
            <button className="p-md hover:bg-neutral-100 rounded-md transition-colors">
              👤
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="p-lg">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

interface NavLinkProps {
  icon: string;
  label: string;
  to: string;
  open: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ icon, label, open }) => {
  return (
    <div className="flex items-center gap-md px-md py-md rounded-md hover:bg-neutral-100 transition-colors cursor-pointer group">
      <span className="text-xl">{icon}</span>
      {open && (
        <span className="text-sm font-medium text-neutral-700 group-hover:text-neutral-900">
          {label}
        </span>
      )}
    </div>
  );
};
