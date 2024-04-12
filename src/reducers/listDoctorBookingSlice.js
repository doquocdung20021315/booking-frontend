import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { servicesManager } from "../services/serviceManager";

const initialState = null;

export const getListDoctorBooking = createAsyncThunk("doctor/getListDoctorBooking", async (data) => {
  const service = servicesManager.serviceAPI;
  return service?.getListDoctorSpecialist(data);
});

export const getInfoDoctor = createAsyncThunk("doctor/getInfoDoctor", async (data) => {
  const service = servicesManager.serviceAPI;
  return service?.getInfoDoctor(data);
});

const listDoctorBookingSlice = createSlice({
  name: "listDoctorBooking",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getListDoctorBooking.rejected, (state) => {
        // console.log(state);
      })
      .addCase(getListDoctorBooking.fulfilled, (state, action) => {
        // console.log(action.payload);
        return action.payload;
      })
      .addCase(getListDoctorBooking.pending, (state) => {
        // console.log(state);
      });
  },
});

export const {} = listDoctorBookingSlice.actions;
export default listDoctorBookingSlice.reducer;
