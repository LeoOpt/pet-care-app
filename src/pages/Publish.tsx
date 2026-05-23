import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, PawPrint, Plus, CheckCircle2 } from 'lucide-react';
import { mockPets } from '../data/mockData';

const Publish: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPets, setSelectedPets] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  const serviceTypes = ['上门喂养', '遛狗', '宠物洗澡', '其他服务'];

  const togglePet = (petId: string) => {
    setSelectedPets(prev => 
      prev.includes(petId) 
        ? prev.filter(id => id !== petId)
        : [...prev, petId]
    );
  };

  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service) 
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };

  const handleSubmit = () => {
    // 这里处理表单提交
    alert('需求发布成功！');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <div className="bg-white p-4 flex items-center shadow-sm sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ArrowLeft size={24} className="text-text-dark" />
        </button>
        <h1 className="text-lg font-bold text-text-dark ml-2">发布需求</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Select Pets */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="font-bold text-text-dark mb-4 flex items-center">
            <PawPrint size={20} className="mr-2 text-primary" />
            选择宠物
          </h2>
          <div className="space-y-3">
            {mockPets.map((pet) => (
              <div 
                key={pet.id}
                onClick={() => togglePet(pet.id)}
                className={`flex items-center p-3 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedPets.includes(pet.id)
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <img 
                  src={pet.avatar} 
                  alt={pet.name}
                  className="w-12 h-12 rounded-lg object-cover mr-3"
                />
                <div className="flex-1">
                  <div className="font-medium text-text-dark">{pet.name}</div>
                  <div className="text-text-light text-sm">{pet.breed} · {pet.age}岁</div>
                </div>
                {selectedPets.includes(pet.id) && (
                  <CheckCircle2 size={24} className="text-primary" />
                )}
              </div>
            ))}
            <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-text-light flex items-center justify-center">
              <Plus size={20} className="mr-2" />
              添加宠物
            </button>
          </div>
        </div>

        {/* Service Type */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="font-bold text-text-dark mb-4">服务类型</h2>
          <div className="grid grid-cols-2 gap-3">
            {serviceTypes.map((type) => (
              <button
                key={type}
                onClick={() => toggleService(type)}
                className={`py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all relative ${
                  selectedServices.includes(type)
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-gray-200 text-text-dark hover:border-gray-300'
                }`}
              >
                {type}
                {selectedServices.includes(type) && (
                  <CheckCircle2 size={18} className="absolute top-2 right-2 text-primary" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Date & Time */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="font-bold text-text-dark mb-4">服务时间</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <Calendar size={20} className="text-text-light mr-3" />
              <div className="flex-1">
                <label className="block text-sm text-text-light mb-1">开始日期</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded-lg text-text-dark"
                />
              </div>
            </div>
            <div className="flex items-center">
              <Clock size={20} className="text-text-light mr-3" />
              <div className="flex-1">
                <label className="block text-sm text-text-light mb-1">结束日期</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded-lg text-text-dark"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="font-bold text-text-dark mb-4">服务地址</h2>
          <div className="flex items-start">
            <MapPin size={20} className="text-text-light mr-3 mt-1" />
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="请输入详细地址..."
              className="flex-1 p-2 border border-gray-200 rounded-lg text-text-dark resize-none"
              rows={3}
            />
          </div>
        </div>

        {/* Notes */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="font-bold text-text-dark mb-4">备注信息</h2>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="请输入其他特殊要求或注意事项..."
            className="w-full p-3 border border-gray-200 rounded-lg text-text-dark resize-none"
            rows={4}
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!selectedPets.length || !selectedServices.length || !startDate || !endDate || !address}
          className="w-full py-4 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-xl shadow-lg disabled:opacity-50 disabled:shadow-none transition-all"
        >
          发布需求
        </button>
      </div>
    </div>
  );
};

export default Publish;
