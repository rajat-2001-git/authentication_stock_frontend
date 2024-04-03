import { createSlice } from "@reduxjs/toolkit";

const stockSlice  = createSlice({
  name: 'stock',
  initialState: {
    data: [],
  },
  reducers: {
    updateStockData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { updateStockData } = stockSlice.actions;
export const selectStockData = (state) => state.stock.data.live_data;
export default stockSlice.reducer;