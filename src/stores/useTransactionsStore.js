import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axiosInstance from "../../axiosConfig";

const useTransactionsStore = create(
  devtools((set, get) => ({
    transactions: { 1: [], 2: [] },
    loading: false,
    fetchData: async (type) => {
      set({ loading: true });
      const data = await axiosInstance.get(`transactions?type=${type}`);
      set((state) => ({
        transactions: { ...state.transactions, [type]: data.data.txs },
      }));
      set({ loading: false });
    },
    renewData: async () => {
      const types = Object.keys(get().transactions);
      for (let type of types) {
        await get().fetchData(type);
      }
    },
  })),
  "TransactionsStore"
);

export default useTransactionsStore;
