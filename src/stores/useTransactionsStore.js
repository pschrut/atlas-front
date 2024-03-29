import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axiosInstance from "../../axiosConfig";

const useTransactionsStore = create(
  devtools((set, get) => ({
    transactions: { 1: {txs: [], total: 0}, 2: {txs: [], total: 0} },
    ignoreLowValues: true,
    ignoreInvestments: true,
    balance: {},
    loading: false,
    setIgnoreLowValues: (value) => {
      set({ ignoreLowValues: value })
      get().renewData();
    },
    fetchBalance: async () => {
      set({ loading: true });
      try {
        const data = await axiosInstance.get("balance");
        set({ balance: data.data });
      } catch (err) {
        throw err;
      } finally {
        set({ loading: false });
      }
    },
    fetchData: async (type) => {
      set({ loading: true });
      try {
        const data = await axiosInstance.get(
          `transactions?type=${type}&ignore_lows=${get().ignoreLowValues}&ignore_investments=${get().ignoreInvestments}`
        );
        set((state) => ({
          transactions: {
            ...state.transactions,
            [type]: {
              txs: data.data.txs,
              total: data.data.total
            },
          },
        }));
        
      } catch (err) {
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
