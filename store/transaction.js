import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
  name: "transaction",
  initialState: { transactions: [], stockNames: [] },
  reducers: {
    setTransactions: (state, action) => {
      state.transactions = action.payload.transactions;
    },
    setStockNames: (state, action) => {
      state.stockNames = action.payload.names;
    },
  },
});

export default transactionSlice.reducer;
export const setTransactions = transactionSlice.actions.setTransactions;
export const setStockNames = transactionSlice.actions.setStockNames;
