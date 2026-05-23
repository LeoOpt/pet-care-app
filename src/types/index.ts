export interface User {
  id: string;
  openid: string;
  nickname: string;
  avatar: string;
  role: 'owner' | 'feeder';
  phone?: string;
  created_at: string;
}

export interface Pet {
  id: string;
  user_id: string;
  name: string;
  type: 'dog' | 'cat' | 'other';
  breed: string;
  age: number;
  avatar?: string;
  notes?: string;
}

export interface Feeder {
  id: string;
  user_id: string;
  user?: User;
  bio: string;
  services: string[];
  price_per_hour: number;
  rating: number;
  review_count: number;
  is_verified: boolean;
}

export interface Order {
  id: string;
  owner_id: string;
  feeder_id: string;
  pet_ids: string[];
  service_type: string;
  start_time: string;
  end_time: string;
  address: string;
  price: number;
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  notes?: string;
  created_at: string;
}

export interface Review {
  id: string;
  order_id: string;
  reviewer_id: string;
  reviewee_id: string;
  rating: number;
  content: string;
  created_at: string;
}
