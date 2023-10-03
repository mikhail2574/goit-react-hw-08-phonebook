import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './api';

const itemSlice = createSlice({
  name: 'items',
  initialState: {
    allItems: [],
    q: '',
    isLoading: false,
    error: null,
  },
  reducers: {
    setQ: (state, action) => {
      state.q = action.payload; // action to set q
    },
  },
  extraReducers: {
    [fetchContacts.pending](state) {
      state.isLoading = true;
    },
    [fetchContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.allItems = action.payload;
    },
    [fetchContacts.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    [addContact.pending](state) {
      state.isLoading = true;
    },
    [addContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.allItems.push(action.payload);
    },
    [addContact.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    [deleteContact.pending](state) {
      state.isLoading = true;
    },
    [deleteContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      const index = state.allItems.findIndex(
        task => task.id === action.payload.id
      );
      state.allItems.splice(index, 1);
    },
    [deleteContact.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { setQ } = itemSlice.actions;
export const itemReducer = itemSlice.reducer;
