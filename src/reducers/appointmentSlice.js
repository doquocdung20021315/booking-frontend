import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { servicesManager } from "../services/serviceManager";

const initialState = null;

export const book = createAsyncThunk("appointment/book", async (data) => {
  const service = servicesManager.serviceAPI;
  return service?.book(data);
});

export const getAllAppointmentAccount = createAsyncThunk("appointment/getAllAppointmentAccount", async (data) => {
  const service = servicesManager.serviceAPI;
  return service?.getAllAppointmentAccount(data);
});

export const deleteAppointmentAccount = createAsyncThunk("appointment/deleteAppointmentAccount", async (data) => {
  const service = servicesManager.serviceAPI;
  return service?.deleteAppointmentAccount(data);
});

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllAppointmentAccount.rejected, (state) => {
        // console.log(state);
      })
      .addCase(getAllAppointmentAccount.fulfilled, (state, action) => {
        // console.log(action.payload);
        return action.payload;
      })
      .addCase(getAllAppointmentAccount.pending, (state) => {
        // console.log(state);
      });
  },
});

export const {} = appointmentSlice.actions;
export default appointmentSlice.reducer;
