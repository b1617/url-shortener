import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { linkApi } from "./apis/LinkApi";

const apis = {
  [linkApi.reducerPath]: linkApi.reducer,
};
const middlewares = [linkApi.middleware];

export const store = configureStore({
  reducer: {
    ...apis,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewares),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
