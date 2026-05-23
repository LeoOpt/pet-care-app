import { create } from 'zustand';
import { User, Feeder, Order, Pet } from '../types';

interface AppState {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  
  feeders: Feeder[];
  setFeeders: (feeders: Feeder[]) => void;
  
  orders: Order[];
  setOrders: (orders: Order[]) => void;
  
  pets: Pet[];
  setPets: (pets: Pet[]) => void;
  
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
  
  feeders: [],
  setFeeders: (feeders) => set({ feeders }),
  
  orders: [],
  setOrders: (orders) => set({ orders }),
  
  pets: [],
  setPets: (pets) => set({ pets }),
  
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
}));
