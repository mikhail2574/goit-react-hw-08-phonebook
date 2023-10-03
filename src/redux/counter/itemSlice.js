import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './api';

const itemSlice = createSlice({
  name: 'items',
  initialState: {
    allItems: [],
    filteredItems: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    addItem: (state, action) => {
      state.allItems.push(action.payload);
      state.filteredItems.push(action.payload);
    },
    removeItem: (state, action) => {
      state.allItems = state.allItems.filter(
        contact => contact.id !== action.payload
      );
      state.filteredItems = state.filteredItems.filter(
        contact => contact.id !== action.payload
      );
    },
    filterItems: (state, action) => {
      if (action.payload && action.payload) {
        state.filteredItems = state.allItems.filter(contact =>
          contact.name.toLowerCase().includes(action.payload.toLowerCase())
        );
      } else {
        state.filteredItems = state.allItems;
      }
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
      state.filteredItems = action.payload;
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
      state.filteredItems.push(action.payload);
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
      state.filteredItems.splice(index, 1);
    },
    [deleteContact.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { addItem, removeItem, filterItems } = itemSlice.actions;
export const itemReducer = itemSlice.reducer;
