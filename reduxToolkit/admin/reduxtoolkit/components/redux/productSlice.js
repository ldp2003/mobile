import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch data từ API
export const fetchProducts = createAsyncThunk('product/fetchProducts', async () => {
  const response = await fetch('https://66fcbb5cc3a184a84d17ccd1.mockapi.io/api/bike');
  const data = await response.json();
  return data;
});

const productSlice = createSlice({
  name: 'product',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {addProduct: (state, action) => {
      state.items.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addProduct } = productSlice.actions;
export default productSlice.reducer;
