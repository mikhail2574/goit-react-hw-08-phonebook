import { configureStore } from '@reduxjs/toolkit';
import { itemReducer } from './counter/itemSlice';

export const store = configureStore({
  reducer: {
    item: itemReducer,
  },
});
