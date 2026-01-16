import { create } from "zustand";

interface UserState {
  userEmail: string;
  isAuthenticated: boolean;
  login: (userEmail: string) => void;
  logout: () => void;
}

const userAuthStore = create<UserState>((set) => ({
  userEmail: "",
  isAuthenticated: false,
  login: (userEmail) => set({
    userEmail:userEmail,
    isAuthenticated: true,
  }),
  logout: () => set({
    userEmail: "",
    isAuthenticated: false,
  }),
}));
export default userAuthStore;