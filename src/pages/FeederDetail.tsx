import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, CheckCircle2, Calendar, MessageCircle, Phone } from 'lucide-react';
import { useAppStore } from '../store';
import { mockReviews } from '../data/mockData';

const FeederDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { feeders } = useAppStore();
  
  const feeder = feeders.find(f => f.id === id);

  if (!feeder) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <p className="text-text-light">未找到该喂养师</p>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-600';
      case 'accepted': return 'bg-blue-100 text-blue-600';
      case 'in_progress': return 'bg-purple-100 text-purple-600';
      case 'completed': return 'bg-green-100 text-green-600';
      case 'cancelled': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return '待接单';
      case 'accepted': return '已接单';
      case 'in_progress': return '进行中';
      case 'completed': return '已完成';
      case 'cancelled': return '已取消';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-secondary pb-24">
      {/* Header */}
      <div className="relative">
        <div className="h-48 bg-gradient-to-r from-primary to-accent" />
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
            <ArrowLeft size={24} className="text-white" />
          </button>
        </div>
        
        {/* Profile Card */}
        <div className="mx-4 -mt-20 bg-white rounded-2xl p-6 shadow-lg relative">
          <div className="flex items-start">
            <img 
              src={feeder.user?.avatar} 
              alt={feeder.user?.nickname}
              className="w-20 h-20 rounded-xl object-cover mr-4 -mt-2 border-4 border-white"
            />
            <div className="flex-1">
              <div className="flex items-center mb-1">
                <h1 className="text-xl font-bold text-text-dark mr-2">{feeder.user?.nickname}</h1>
                {feeder.is_verified && (
                  <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full flex items-center">
                    <CheckCircle2 size={12} className="mr-1" />
                    已认证
                  </span>
                )}
              </div>
              <div className="flex items-center mb-2">
                <Star size={16} className="text-yellow-400 fill-yellow-400 mr-1" />
                <span className="text-text-dark font-medium">{feeder.rating}</span>
                <span className="text-text-light mx-2">·</span>
                <span className="text-text-light">{feeder.review_count}条评价</span>
              </div>
              <p className="text-text-light text-sm">{feeder.bio}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Services */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="font-bold text-text-dark mb-3">服务项目</h2>
          <div className="flex flex-wrap gap-2">
            {feeder.services.map((service, index) => (
              <span key={index} className="bg-secondary text-text-dark px-3 py-2 rounded-xl text-sm">
                {service}
              </span>
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="font-bold text-text-dark mb-3">服务价格</h2>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-primary">¥{feeder.price_per_hour}</span>
            <span className="text-text-light ml-1">/小时</span>
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-text-dark">用户评价</h2>
            <span className="text-primary text-sm">查看全部</span>
          </div>
          <div className="space-y-4">
            {mockReviews.map((review) => (
              <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 rounded-full bg-gray-200 mr-3" />
                  <div className="flex-1">
                    <div className="font-medium text-text-dark text-sm">用户</div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={12} 
                          className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                        />
                      ))}
                      <span className="text-text-light text-xs ml-2">
                        {new Date(review.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-text-dark text-sm">{review.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 flex gap-3">
        <button className="flex-1 py-3 border-2 border-primary text-primary font-bold rounded-xl flex items-center justify-center">
          <MessageCircle size={20} className="mr-2" />
          联系TA
        </button>
        <button 
          onClick={() => navigate('/publish')}
          className="flex-1 py-3 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-xl"
        >
          立即预约
        </button>
      </div>
    </div>
  );
};

export default FeederDetail;
