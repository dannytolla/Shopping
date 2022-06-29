import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiCalls from "./apiCalls";

const initialState = {
  item: null,
  items: "",
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMessage: "",
};

export const getAllItems = createAsyncThunk("items", async (_, thunkApi) => {
  try {
    const token = thunkApi.getState().auth.user.token;
    return await apiCalls.getAllItems(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkApi.rejectWithValue(message);
  }
});

export const addItem = createAsyncThunk("add-item", async (data, thunkApi) => {
  try {
    const token = thunkApi.getState().auth.user.token;
    return await apiCalls.createItem(token, data);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkApi.rejectWithValue(message);
  }
});

export const deleteItem = createAsyncThunk(
  "delete-item",
  async (id, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user.token;
      return await apiCalls.deleteItem(token, id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkApi.rejectWithValue(message);
    }
  }
);

export const getItem = createAsyncThunk("get-item", async (id, thunkApi) => {
  try {
    const token = thunkApi.getState().auth.user.token;
    return await apiCalls.getItem(token, id);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkApi.rejectWithValue(message);
  }
});

export const updateStatus = createAsyncThunk(
  "update-status",
  async (id, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user.token;
      return await apiCalls.updateStatus(token, id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkApi.rejectWithValue(message);
    }
  }
);

export const updateItem = createAsyncThunk(
  "update-item",
  async (data, thunkApi) => {
    try {
      const token = thunkApi.getState().auth.user.token;
      return await apiCalls.updateItem(token, data);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkApi.rejectWithValue(message);
    }
  }
);

export const userSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(getAllItems.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(getItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getItem.fulfilled, (state, action) => {
        state.item = action.payload;
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(getItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(addItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(addItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(updateStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        state.items = state.items.map((item) =>
          item._id === action.payload._id
            ? { ...item, status: action.payload.status }
            : item
        );
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(updateStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(updateItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        const found = state.items.find(
          (item) => item._id === action.payload._id
        );
        state.items = state.items.map((item) => {
          if (found) {
            Object.assign(found, action.payload);

            return {
              ...item,
            };
          }

          return item;
        });
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(deleteItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item._id !== action.payload.id
        );
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
