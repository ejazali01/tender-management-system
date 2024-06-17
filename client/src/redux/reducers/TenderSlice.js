import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API_URL from "../../api";

export const createTender = createAsyncThunk(
  "tender/create-tender",
  async (tenderData, { rejectWithValue }) => {
    try {
      const response = await API_URL.post("/tender/create-tender", tenderData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

export const getAllTender = createAsyncThunk(
  'tender/getAll', // More descriptive action type
  async (_, { rejectWithValue }) => {
    try {
      const response = await API_URL.get('/tender/');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const TenderSlice = createSlice({
  name: "tender",
  initialState: {
    tender: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTender.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTender.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createTender.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getAllTender.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllTender.fulfilled, (state, action) => {
        state.loading = false;
        state.tender = action.payload;
      })
      .addCase(getAllTender.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetError } = TenderSlice.actions;
export default TenderSlice.reducer;
