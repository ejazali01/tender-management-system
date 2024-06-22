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
  "tender/getAllTender",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API_URL.get("/tender/");
      return response.data; // Ensure this is the correct data structure
    } catch (error) {
      console.error("Error fetching tenders:", error.response, error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getTenderById = createAsyncThunk(
  "tender/getTenderById",
  async (tenderId, { rejectWithValue }) => {
    try {
      const response = await API_URL.get(`/tender/${tenderId}`);
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching tender details:",
        error.response,
        error.message
      );
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateTenderEndTime = createAsyncThunk(
  "tender/updateEndTime",
  async ({ tenderId, newEndTime }, { rejectWithValue }) => {
    try {
      const updatedResponse = await API_URL.put(
        `/tender/buffer-time/${tenderId}`,
        { endTime: newEndTime }
      );
      return { ...updatedResponse.data };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteMultipleTenders = createAsyncThunk(
  "tender/deleteMultipleTenders",
  async (tenderIds, { rejectWithValue }) => {
    try {
      await API_URL.delete("/tender/delete-multi", {
        data: { ids: tenderIds },
      });
      return tenderIds;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

const TenderSlice = createSlice({
  name: "tender",
  initialState: {
    tender: null,
    tenderDetails: null,
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

      .addCase(getTenderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTenderById.fulfilled, (state, action) => {
        state.loading = false;
        state.tenderDetails = action.payload;
      })
      .addCase(getTenderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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
      })

      .addCase(updateTenderEndTime.fulfilled, (state, action) => {
        const index = state.tender.findIndex(
          (tender) => tender._id === action.payload._id
        );
        if (index !== -1) {
          state.tender[index] = action.payload;
        }
      })

      .addCase(deleteMultipleTenders.fulfilled, (state, action) => {
        state.tender = state.tender.filter(
          (tender) => !action.payload.includes(tender._id)
        );
      });
  },
});

export const { resetError } = TenderSlice.actions;
export default TenderSlice.reducer;
