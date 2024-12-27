// store.js
import { create } from "zustand";

const useStore = create((set, get) => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
  getToken: () => get().user?.token, // Method to get token from user state
}));

export default useStore;