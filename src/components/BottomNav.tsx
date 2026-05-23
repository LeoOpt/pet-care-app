import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, PlusSquare, FileText, User } from 'lucide-react';

const BottomNav: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: '首页' },
    { path: '/', icon: Search, label: '发现' },
    { path: '/publish', icon: PlusSquare, label: '发布', isAction: true },
    { path: '/orders', icon: FileText, label: '订单' },
    { path: '/profile', icon: User, label: '我的' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-2 pb-4 pt-2 z-50">
      <div className="flex items-center justify-around">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          
          if (item.isAction) {
            return (
              <Link key={index} to={item.path} className="relative -mt-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-lg">
                  <item.icon size={28} className="text-white" />
                </div>
              </Link>
            );
          }

          return (
            <Link 
              key={index} 
              to={item.path}
              className="flex flex-col items-center py-2 px-4"
            >
              <item.icon 
                size={24} 
                className={isActive ? 'text-primary fill-primary/20' : 'text-text-light'} 
              />
              <span className={`text-xs mt-1 ${isActive ? 'text-primary font-medium' : 'text-text-light'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
