import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, ChevronRight } from 'lucide-react';
import { useAppStore } from '../store';
import { mockOrders } from '../data/mockData';
import { Order } from '../types';

const Orders: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'in_progress' | 'completed'>('all');
  const { setOrders, orders } = useAppStore();

  useEffect(() => {
    setOrders(mockOrders);
  }, [setOrders]);

  const tabs = [
    { key: 'all', label: '全部' },
    { key: 'pending', label: '待接单' },
    { key: 'in_progress', label: '进行中' },
    { key: 'completed', label: '已完成' },
  ];

  const filteredOrders = activeTab === 'all' 
    ? orders 
    : orders.filter(order => order.status === activeTab);

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
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm sticky top-0 z-10">
        <h1 className="text-lg font-bold text-text-dark text-center">我的订单</h1>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-100 sticky top-14 z-10">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 py-4 text-sm font-medium transition-all relative ${
                activeTab === tab.key
                  ? 'text-primary'
                  : 'text-text-light'
              }`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Order List */}
      <div className="p-4">
        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Calendar size={48} className="text-gray-300" />
            </div>
            <p className="text-text-light">暂无订单</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} getStatusColor={getStatusColor} getStatusText={getStatusText} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const OrderCard: React.FC<{ 
  order: Order; 
  getStatusColor: (status: string) => string;
  getStatusText: (status: string) => string;
}> = ({ order, getStatusColor, getStatusText }) => {
  return (
    <Link to={`/order/${order.id}`} className="bg-white rounded-2xl p-4 shadow-sm block">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-bold text-text-dark">{order.service_type}</h3>
          <p className="text-text-light text-sm">订单号: {order.id.slice(0, 8)}...</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
          {getStatusText(order.status)}
        </span>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-text-dark">
          <Calendar size={16} className="text-text-light mr-2 flex-shrink-0" />
          <span>
            {new Date(order.start_time).toLocaleDateString()} - {new Date(order.end_time).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center text-sm text-text-dark">
          <MapPin size={16} className="text-text-light mr-2 flex-shrink-0" />
          <span className="line-clamp-1">{order.address}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="text-primary font-bold">¥{order.price}</div>
        <div className="flex items-center text-primary text-sm">
          查看详情
          <ChevronRight size={16} />
        </div>
      </div>
    </Link>
  );
};

export default Orders;
