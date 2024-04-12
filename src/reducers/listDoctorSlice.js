import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { servicesManager } from "../services/serviceManager";

const initialState = null;

export const getListDoctor = createAsyncThunk("doctor/getListDoctor", async (data) => {
  const service = servicesManager.serviceAPI;
  return service?.getListDoctor(data);
});

export const getListDoctorByID = createAsyncThunk("doctor/getListDoctorByID", async (data) => {
  const service = servicesManager.serviceAPI;
  return service?.getListDoctorByID(data);
});

export const addDoctor = createAsyncThunk("doctor/addDoctor", async (data) => {
  const service = servicesManager.serviceAPI;
  return service?.addDoctor(data);
});

export const deleteDoctor = createAsyncThunk("doctor/deleteDoctor", async (data) => {
  const service = servicesManager.serviceAPI;
  return service?.deleteDoctor(data);
});

const listDoctorSlice = createSlice({
  name: "listDoctor",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getListDoctor.rejected, (state) => {
        // console.log(state);
      })
      .addCase(getListDoctor.fulfilled, (state, action) => {
        // console.log(action.payload);
        return action.payload;
      })
      .addCase(getListDoctor.pending, (state) => {
        // console.log(state);
      })
      .addCase(getListDoctorByID.rejected, (state) => {
        // console.log(state);
      })
      .addCase(getListDoctorByID.fulfilled, (state, action) => {
        // console.log(action.payload);
        return action.payload;
      })
      .addCase(getListDoctorByID.pending, (state) => {
        // console.log(state);
      });
  },
});

export const {} = listDoctorSlice.actions;
export default listDoctorSlice.reducer;
