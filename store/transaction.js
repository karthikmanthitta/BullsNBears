import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
  name: "transaction",
  initialState: { transactions: [] },
  reducers: {
    setTransactions: (state, action) => {
      state.transactions = action.payload.transactions;
    },
  },
});

export default transactionSlice.reducer;
export const setTransactions = transactionSlice.actions.setTransactions;
