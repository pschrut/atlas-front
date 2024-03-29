import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axiosInstance from "../../axiosConfig";

const useTransactionsStore = create(
  devtools((set, get) => ({
    transactions: { 1: [], 2: [] },
    balance: {},
    loading: false,
    fetchBalance: async () => {
      set({ loading: true });
      try {
        const data = await axiosInstance.get("balance");
        set({ balance: data.data });
      } catch(err) {
        throw err;
      } finally {
        set({ loading: false });
      }
    },
    fetchData: async (type) => {
      set({ loading: true });
      try {
        const data = await axiosInstance.get(`transactions?type=${type}`);
        set((state) => ({
          transactions: { ...state.transactions, [type]: data.data.txs },
        }));
      } catch(err) {
        throw err;
      } finally {
        set({ loading: false });
      }
    },
    renewData: async () => {
      const types = Object.keys(get().transactions);
      for (let type of types) {
        await get().fetchData(type);
      }
      await get().fetchBalance();
    },
  })),
  "TransactionsStore"
);

export default useTransactionsStore;
