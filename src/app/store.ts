import { dictionaryApi } from "@/services/dictionary-api";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    [dictionaryApi.reducerPath]: dictionaryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(dictionaryApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
