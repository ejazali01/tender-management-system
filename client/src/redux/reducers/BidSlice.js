import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API_URL from "../../api";

// Existing thunks
export const addBid = createAsyncThunk(
  "/bid/add-bid",
  async (bidData, { rejectWithValue }) => {
    try {
      const response = await API_URL.post("/bid/add-bid", bidData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

export const getAllBids = createAsyncThunk(
  "bid/getAllBids",
  async (tenderId, { rejectWithValue }) => {
    try {
      const response = await API_URL.get(`/bid/${tenderId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching tenders:", error.response, error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteBids = createAsyncThunk(
  "tender/deleteBids",
  async (bidIds, { rejectWithValue }) => {
    try {
      await API_URL.delete("/bid/delete-multi", { data: { ids: bidIds } });
      return bidIds;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

const BidSlice = createSlice({
  name: "bid",
  initialState: {
    bid: null,
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
      .addCase(addBid.pending, (state) => {
        state.loading = true;
      })
      .addCase(addBid.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addBid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getAllBids.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllBids.fulfilled, (state, action) => {
        state.loading = false;
        state.bid = action.payload.sort((a, b) => b.bidCost - a.bidCost);
      })
      .addCase(getAllBids.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Handle deleteBids states
      .addCase(deleteBids.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBids.fulfilled, (state, action) => {
        state.bid = state.bid.filter(
          (bid) => !action.payload.includes(bid._id)
        );
      })

      .addCase(deleteBids.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetError } = BidSlice.actions;
export default BidSlice.reducer;
