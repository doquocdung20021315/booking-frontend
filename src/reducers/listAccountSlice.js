import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { servicesManager } from "../services/serviceManager";

const initialState = null;

export const getAllAccountByNotRole = createAsyncThunk("account/getAllAccountByNotRole", async (data) => {
  const service = servicesManager.serviceAPI;
  return service?.getAllAccountByNotRole(data);
});

export const searchAccount = createAsyncThunk("account/searchAccount", async (data) => {
  const service = servicesManager.serviceAPI;
  return service?.searchAccount(data);
});

export const createAccount = createAsyncThunk("account/createAccount", async (data) => {
  const service = servicesManager.serviceAPI;
  return service?.createAccount(data);
});

export const deleteAccount = createAsyncThunk("account/deleteAccount", async (data) => {
  const service = servicesManager.serviceAPI;
  return service?.deleteAccount(data);
});

const listAccountSlice = createSlice({
  name: "listAccount",
  initialState,
  reducers: {
    setListAccount: (state, action) => {
      state = action.payload;
      return state;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllAccountByNotRole.rejected, (state) => {
        // console.log(state);
      })
      .addCase(getAllAccountByNotRole.fulfilled, (state, action) => {
        // console.log(action.payload);
        return action.payload;
      })
      .addCase(getAllAccountByNotRole.pending, (state) => {
        // console.log(state);
      });
  },
});

export const { setListAccount } = listAccountSlice.actions;
export default listAccountSlice.reducer;
