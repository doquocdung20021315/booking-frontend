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

export const getAllAppointmentFacility = createAsyncThunk("appointment/getAllAppointmentFacility", async (data) => {
  const service = servicesManager.serviceAPI;
  return service?.getAllAppointmentFacility(data);
});

export const deleteAppointmentAccount = createAsyncThunk("appointment/deleteAppointmentAccount", async (data) => {
  const service = servicesManager.serviceAPI;
  return service?.deleteAppointmentAccount(data);
});

export const searchAppointment = createAsyncThunk("appointment/searchAppointment", async (data) => {
  const service = servicesManager.serviceAPI;
  return service?.searchAppointment(data);
});

export const searchAppointmentByObjectId = createAsyncThunk("appointment/searchAppointmentByObjectId", async (data) => {
  const service = servicesManager.serviceAPI;
  return service?.searchAppointmentByObjectId(data);
});

export const checkAppointment = createAsyncThunk("appointment/checkAppointment", async (data) => {
  const service = servicesManager.serviceAPI;
  return service?.checkAppointment(data);
});

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    setListAppointment: (state, action) => {
      state = action.payload;
      return state;
    },
  },
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
      })
      .addCase(getAllAppointmentFacility.rejected, (state) => {
        // console.log(state);
      })
      .addCase(getAllAppointmentFacility.fulfilled, (state, action) => {
        // console.log(action.payload);
        return action.payload;
      })
      .addCase(getAllAppointmentFacility.pending, (state) => {
        // console.log(state);
      });
  },
});

export const { setListAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;
