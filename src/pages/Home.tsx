import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, PawPrint, Clock, Search } from 'lucide-react';
import { useAppStore } from '../store';
import { mockFeeders } from '../data/mockData';
import { Feeder } from '../types';

const Home: React.FC = () => {
  const { setFeeders, feeders } = useAppStore();

  useEffect(() => {
    setFeeders(mockFeeders);
  }, [setFeeders]);

  const services = [
    { icon: PawPrint, name: '上门喂养', color: 'bg-orange-100 text-orange-600' },
    { icon: Clock, name: '遛狗', color: 'bg-blue-100 text-blue-600' },
    { icon: PawPrint, name: '宠物洗澡', color: 'bg-green-100 text-green-600' },
    { icon: Search, name: '更多服务', color: 'bg-purple-100 text-purple-600' },
  ];

  return (
    <div className="min-h-screen bg-secondary pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent p-6 pb-12">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-white/80 text-sm">当前位置</p>
            <div className="flex items-center text-white">
              <MapPin size={16} className="mr-1" />
              <span className="font-medium">北京市朝阳区</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <PawPrint size={20} className="text-white" />
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="bg-white rounded-xl p-3 flex items-center shadow-lg">
          <Search size={20} className="text-text-light mr-2" />
          <input 
            type="text" 
            placeholder="搜索喂养师或服务..." 
            className="flex-1 bg-transparent border-none outline-none text-text-dark"
          />
        </div>
      </div>

      <div className="px-4 -mt-6">
        {/* Services Grid */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-6">
          <div className="grid grid-cols-4 gap-4">
            {services.map((service, index) => (
              <Link key={index} to="/publish" className="flex flex-col items-center">
                <div className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mb-2`}>
                  <service.icon size={24} />
                </div>
                <span className="text-sm text-text-dark">{service.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Featured Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-text-dark">热门喂养师</h2>
            <Link to="/" className="text-primary text-sm">查看全部</Link>
          </div>
          
          <div className="space-y-4">
            {feeders.map((feeder) => (
              <FeederCard key={feeder.id} feeder={feeder} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const FeederCard: React.FC<{ feeder: Feeder }> = ({ feeder }) => {
  return (
    <Link to={`/feeder/${feeder.id}`} className="bg-white rounded-2xl p-4 shadow-sm flex">
      <img 
        src={feeder.user?.avatar} 
        alt={feeder.user?.nickname}
        className="w-20 h-20 rounded-xl object-cover mr-4"
      />
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-bold text-text-dark">{feeder.user?.nickname}</h3>
          {feeder.is_verified && (
            <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">已认证</span>
          )}
        </div>
        <div className="flex items-center mb-2">
          <Star size={14} className="text-yellow-400 fill-yellow-400 mr-1" />
          <span className="text-sm text-text-dark">{feeder.rating}</span>
          <span className="text-text-light text-sm ml-1">({feeder.review_count}条评价)</span>
        </div>
        <p className="text-text-light text-sm mb-2 line-clamp-2">{feeder.bio}</p>
        <div className="flex flex-wrap gap-2 mb-2">
          {feeder.services.slice(0, 3).map((service, index) => (
            <span key={index} className="bg-secondary text-text-dark text-xs px-2 py-1 rounded-lg">
              {service}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-primary font-bold">¥{feeder.price_per_hour}/小时</span>
        </div>
      </div>
    </Link>
  );
};

export default Home;
