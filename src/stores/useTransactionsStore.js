import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useTransactionsStore = create(
  devtools((set) => ({
    balanceIn: [],
    balanceOut: [],
    setBalanceIn: (balanceIn) => set(() => ({ balanceIn: balanceIn })),
    setBalanceOut: (balanceOut) => set(() => ({ balanceOut: balanceOut })),
  }))
);

export default useTransactionsStore;
