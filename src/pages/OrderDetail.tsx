import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, MessageCircle, Phone } from 'lucide-react';
import { useAppStore } from '../store';

const OrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { orders } = useAppStore();
  
  const order = orders.find(o => o.id === id);

  if (!order) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <p className="text-text-light">未找到该订单</p>
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
      <div className="bg-white p-4 flex items-center shadow-sm sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ArrowLeft size={24} className="text-text-dark" />
        </button>
        <h1 className="text-lg font-bold text-text-dark ml-2">订单详情</h1>
      </div>

      {/* Status Banner */}
      <div className="bg-gradient-to-r from-primary to-accent p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-1">{order.service_type}</h2>
            <p className="text-white/80 text-sm">订单号: {order.id.slice(0, 12)}...</p>
          </div>
          <span className={`px-4 py-2 rounded-full text-sm font-medium bg-white/20`}>
            {getStatusText(order.status)}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Service Info */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-text-dark mb-4">服务信息</h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <Calendar size={20} className="text-text-light mr-3 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <div className="text-text-light text-sm">服务时间</div>
                <div className="text-text-dark">
                  {new Date(order.start_time).toLocaleDateString()} - {new Date(order.end_time).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className="flex items-start">
              <MapPin size={20} className="text-text-light mr-3 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <div className="text-text-light text-sm">服务地址</div>
                <div className="text-text-dark">{order.address}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Pet Info */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-text-dark mb-4">服务宠物</h3>
          <div className="flex gap-3">
            {order.pet_ids.map((petId, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-xl mb-1" />
                <span className="text-text-dark text-sm">宠物{index + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Notes */}
        {order.notes && (
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <h3 className="font-bold text-text-dark mb-3">备注信息</h3>
            <p className="text-text-dark text-sm">{order.notes}</p>
          </div>
        )}

        {/* Price */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-text-dark mb-4">费用明细</h3>
          <div className="flex items-center justify-between">
            <span className="text-text-dark">服务费用</span>
            <span className="text-primary font-bold text-xl">¥{order.price}</span>
          </div>
        </div>

        {/* Order Info */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-text-dark mb-4">订单信息</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-light">创建时间</span>
              <span className="text-text-dark">{new Date(order.created_at).toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-light">订单状态</span>
              <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(order.status)}`}>
                {getStatusText(order.status)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 flex gap-3">
        <button className="flex-1 py-3 border-2 border-primary text-primary font-bold rounded-xl flex items-center justify-center">
          <MessageCircle size={20} className="mr-2" />
          联系客服
        </button>
        <button className="flex-1 py-3 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-xl">
          取消订单
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;
