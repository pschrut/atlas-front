import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axiosInstance from "../../axiosConfig";

const useUserStore = create(
  devtools((set, get) => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    setUser: (user) => {
      localStorage.setItem("user", JSON.stringify(user));
      set({ user });
    },
    login: async (data) => {
      const response = await axiosInstance.postForm("login", data);
      get().setUser(response.data.logged_in_user);
    },
    logout: async () => {
      await axiosInstance.post("logout");
      localStorage.removeItem("user");
      get().setUser(null);
    },
  })),
  "UserStore"
);

export default useUserStore;
