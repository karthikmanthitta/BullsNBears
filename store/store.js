import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "./transaction";

const store = configureStore({ reducer: { transactions: transactionReducer } });

export default store;
