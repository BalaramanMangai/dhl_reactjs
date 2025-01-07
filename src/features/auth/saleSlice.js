import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sales: [],  // This must be an array
};

const saleSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {
    addSales: (state, action) => {
      if (!Array.isArray(state.sales)) {
        state.sales = []; // Ensure it's an array
      }
      console.log('sales', state.sales); // Debugging log
      state.sales.push(action.payload); // Add new sale

    },
    removeSales: (state, action) => {
      state.sales = [];
    },

  },
});

export const { addSales , removeSales} = saleSlice.actions;
export default saleSlice.reducer;
