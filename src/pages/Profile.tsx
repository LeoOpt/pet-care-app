import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  PawPrint, 
  Settings, 
  HelpCircle, 
  MessageCircle, 
  ChevronRight,
  Star,
  Wallet,
  History,
  Shield
} from 'lucide-react';
import { useAppStore } from '../store';
import { mockUsers, mockPets } from '../data/mockData';

const Profile: React.FC = () => {
  const { setCurrentUser, setPets, currentUser, pets } = useAppStore();

  useEffect(() => {
    setCurrentUser(mockUsers[0]);
    setPets(mockPets);
  }, [setCurrentUser, setPets]);

  const menuItems = [
    { icon: PawPrint, label: '我的宠物', path: '/', color: 'text-orange-500' },
    { icon: History, label: '服务记录', path: '/orders', color: 'text-blue-500' },
    { icon: Wallet, label: '我的钱包', path: '/', color: 'text-green-500' },
    { icon: Star, label: '我的收藏', path: '/', color: 'text-yellow-500' },
    { icon: Shield, label: '帮助中心', path: '/', color: 'text-purple-500' },
    { icon: Settings, label: '设置', path: '/', color: 'text-gray-500' },
  ];

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent p-6 pb-20">
        <div className="flex items-center">
          {currentUser?.avatar ? (
            <img 
              src={currentUser.avatar} 
              alt={currentUser.nickname}
              className="w-16 h-16 rounded-full object-cover mr-4 border-4 border-white/30"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-white/30 flex items-center justify-center mr-4">
              <User size={32} className="text-white" />
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-xl font-bold text-white mb-1">{currentUser?.nickname}</h1>
            <p className="text-white/80 text-sm">{currentUser?.role === 'owner' ? '宠物主人' : '喂养师'}</p>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-10">
        {/* Stats Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-text-dark">0</div>
              <div className="text-text-light text-sm">完成订单</div>
            </div>
            <div className="border-x border-gray-100">
              <div className="text-2xl font-bold text-text-dark">{pets.length}</div>
              <div className="text-text-light text-sm">我的宠物</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-text-dark">0</div>
              <div className="text-text-light text-sm">收藏</div>
            </div>
          </div>
        </div>

        {/* My Pets */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-text-dark flex items-center">
              <PawPrint size={20} className="mr-2 text-primary" />
              我的宠物
            </h2>
            <Link to="/" className="text-primary text-sm flex items-center">
              管理
              <ChevronRight size={16} />
            </Link>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {pets.map((pet) => (
              <div key={pet.id} className="flex flex-col items-center flex-shrink-0">
                {pet.avatar ? (
                  <img 
                    src={pet.avatar} 
                    alt={pet.name}
                    className="w-14 h-14 rounded-xl object-cover mb-1"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-xl bg-gray-200 mb-1" />
                )}
                <span className="text-text-dark text-sm">{pet.name}</span>
              </div>
            ))}
            <button className="w-14 h-14 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center text-text-light flex-shrink-0">
              <PawPrint size={24} />
            </button>
          </div>
        </div>

        {/* Menu */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {menuItems.map((item, index) => (
            <Link 
              key={index} 
              to={item.path}
              className="flex items-center p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
            >
              <div className={`w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center mr-3`}>
                <item.icon size={20} className={item.color} />
              </div>
              <span className="flex-1 text-text-dark">{item.label}</span>
              <ChevronRight size={20} className="text-text-light" />
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 mb-8 text-center">
          <p className="text-text-light text-sm">宠物上门喂养小程序 v1.0</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
