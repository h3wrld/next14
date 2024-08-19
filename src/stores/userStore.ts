import { create } from 'zustand';
import { User } from '@/types/user';
import { userService } from '@/services/userService';

type UserState = {
  users: User[];
  currentUser: User | null;
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  fetchUserById: (id: number) => Promise<void>;
};

export const useUserStore = create<UserState>((set) => ({
  users: [],
  currentUser: null,
  loading: false,
  error: null,
  fetchUsers: async () => {
    set({ loading: true });
    try {
      const users = await userService.getAll();
      set({ users, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch users', loading: false });
    }
  },
  fetchUserById: async (id: number) => {
    set({ loading: true });
    try {
      const user = await userService.getById(id);
      set({ currentUser: user, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch user', loading: false });
    }
  },
}));