import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { servicesManager } from "../services/serviceManager";

const initialState = null;

export const getListDoctor = createAsyncThunk("doctor/getListDoctor", async () => {
  const service = servicesManager.serviceAPI;
  return service?.getListDoctor();
});

const listDoctorSlice = createSlice({
  name: "doctor",
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
      });
  },
});

export const {} = listDoctorSlice.actions;
export default listDoctorSlice.reducer;
