import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
  name: "transaction",
  initialState: { transactions: [] },
  reducers: {
    test: () => {
      console.log("test");
    },
    setTransactions: (state, action) => {
      state.transactions = action.payload.transactions;
    },
  },
});

export default transactionSlice.reducer;
export const testFun = transactionSlice.actions.test;
export const setTransactions = transactionSlice.actions.setTransactions;
