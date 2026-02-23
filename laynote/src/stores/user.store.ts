import { create } from "zustand";

interface UserState {
  userEmail: string;
  isAuthenticated: boolean;
  authLoading: boolean;
  login: (userEmail: string) => void;
  logout: () => void;
  restoreAuth: () => void;
}

const useAuthStore = create<UserState>((set) => ({
  authLoading: true,
  userEmail: "",
  isAuthenticated: false,

  login: (userEmail) => {
    localStorage.setItem("userEmail", userEmail);
    set({
      userEmail,
      isAuthenticated: true,
      authLoading: false,
    });
  },

  logout: () => {
    localStorage.removeItem("userEmail");
    set({
      userEmail: "",
      isAuthenticated: false,
      authLoading: false,
    });
  },

  restoreAuth: () => {
    const userEmail = localStorage.getItem("userEmail");
    set({
      userEmail: userEmail ?? "",
      isAuthenticated: !!userEmail,
      authLoading: false,
    });
  },
}));

export default useAuthStore;
