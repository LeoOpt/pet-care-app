import { User, Feeder, Order, Pet, Review } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    openid: 'mock_openid_1',
    nickname: '张小明',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    role: 'owner',
    phone: '13800138000',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    openid: 'mock_openid_2',
    nickname: '李小红',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    role: 'feeder',
    phone: '13900139000',
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    openid: 'mock_openid_3',
    nickname: '王小华',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    role: 'feeder',
    phone: '13700137000',
    created_at: new Date().toISOString(),
  },
];

export const mockPets: Pet[] = [
  {
    id: '1',
    user_id: '1',
    name: '毛毛',
    type: 'dog',
    breed: '金毛',
    age: 3,
    avatar: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=150&h=150&fit=crop',
    notes: '很乖的金毛，喜欢玩球',
  },
  {
    id: '2',
    user_id: '1',
    name: '咪咪',
    type: 'cat',
    breed: '英短蓝猫',
    age: 2,
    avatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=150&h=150&fit=crop',
    notes: '性格温顺，喜欢晒太阳',
  },
];

export const mockFeeders: Feeder[] = [
  {
    id: '1',
    user_id: '2',
    user: mockUsers[1],
    bio: '养宠5年经验，自家有一只金毛和一只猫，非常喜欢小动物，有爱心有耐心。',
    services: ['上门喂养', '遛狗', '宠物洗澡'],
    price_per_hour: 50,
    rating: 4.9,
    review_count: 128,
    is_verified: true,
  },
  {
    id: '2',
    user_id: '3',
    user: mockUsers[2],
    bio: '专业宠物护理师，持证上岗，可处理各类宠物，经验丰富。',
    services: ['上门喂养', '遛狗', '宠物洗澡', '宠物医疗护理'],
    price_per_hour: 65,
    rating: 4.8,
    review_count: 86,
    is_verified: true,
  },
];

export const mockOrders: Order[] = [
  {
    id: '1',
    owner_id: '1',
    feeder_id: '2',
    pet_ids: ['1', '2'],
    service_type: '上门喂养',
    start_time: new Date(Date.now() + 86400000).toISOString(),
    end_time: new Date(Date.now() + 172800000).toISOString(),
    address: '北京市朝阳区建国路88号',
    price: 150,
    status: 'pending',
    notes: '需要每天早晚各喂一次',
    created_at: new Date().toISOString(),
  },
];

export const mockReviews: Review[] = [
  {
    id: '1',
    order_id: '1',
    reviewer_id: '1',
    reviewee_id: '2',
    rating: 5,
    content: '非常专业，照顾得很周到，好评！',
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
];
