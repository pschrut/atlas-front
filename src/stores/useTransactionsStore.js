import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axiosInstance from "../../axiosConfig";

const useTransactionsStore = create(
  devtools((set, get) => ({
    transactions: { 1: { txs: [], total: 0 }, 2: { txs: [], total: 0 } },
    ignoreLowValues: true,
    ignoreInvestments: true,
    balance: {},
    periods: [],
    currentPeriod: {},
    loading: false,
    setIgnoreLowValues: (value) => {
      set({ ignoreLowValues: value });
      get().renewData(get().currentPeriod.id);
    },
    fetchBalance: async (period) => {
      set({ loading: true });
      try {
        const data = await axiosInstance.get(`balance?period_id=${period}`);
        set({ balance: data.data });
      } catch (err) {
        throw err;
      } finally {
        set({ loading: false });
      }
    },
    fetchData: async (type, period) => {
      set({ loading: true });
      try {
        const data = await axiosInstance.get(
          `transactions?type=${type}&ignore_lows=${
            get().ignoreLowValues
          }&ignore_investments=${get().ignoreInvestments}&period_id=${period}`
        );
        set((state) => ({
          transactions: {
            ...state.transactions,
            [type]: {
              txs: data.data.txs,
              total: data.data.total,
            },
          },
        }));
      } catch (err) {
        throw err;
      } finally {
        set({ loading: false });
      }
    },
    setCurrentPeriod: (period) => {
      set({ currentPeriod: period });
    },
    fetchPeriods: async () => {
      set({ loading: true });
      try {
        const data = await axiosInstance.get("periods");
        set({ periods: data.data?.periods });
        set({ currentPeriod: data.data?.periods[0] });
      } catch (err) {
        throw err;
      } finally {
        set({ loading: false });
      }
    },
    renewData: async (period) => {
      const types = Object.keys(get().transactions);
      for (let type of types) {
        await get().fetchData(type, period);
      }
      await get().fetchBalance(period);
    },
  })),
  "TransactionsStore"
);

export default useTransactionsStore;
