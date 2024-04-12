import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { servicesManager } from "../services/serviceManager";

const initialState = null;

export const getListSpecialist = createAsyncThunk("specialist/getListSpecialist", async (data) => {
  const service = servicesManager.serviceAPI;
  return service?.getListSpecialist(data);
});

export const addSpecialist = createAsyncThunk("specialist/addSpecialist", async (data) => {
  const service = servicesManager.serviceAPI;
  return service?.addSpecialist(data);
});

export const deleteSpecialist = createAsyncThunk("specialist/deleteSpecialist", async (data) => {
  const service = servicesManager.serviceAPI;
  return service?.deleteSpecialist(data);
});

const listSpecialistSlice = createSlice({
  name: "specialist",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getListSpecialist.rejected, (state) => {
        // console.log(state);
      })
      .addCase(getListSpecialist.fulfilled, (state, action) => {
        // console.log(action.payload);
        return action.payload;
      })
      .addCase(getListSpecialist.pending, (state) => {
        // console.log(state);
      })
      .addCase(addSpecialist.rejected, (state) => {
        // console.log(state);
      })
      .addCase(addSpecialist.fulfilled, (state, action) => {
        // console.log(action.payload);
        return action.payload;
      })
      .addCase(addSpecialist.pending, (state) => {
        // console.log(state);
      })
      .addCase(deleteSpecialist.rejected, (state) => {
        // console.log(state);
      })
      .addCase(deleteSpecialist.fulfilled, (state, action) => {
        // console.log(action.payload);
        return action.payload;
      })
      .addCase(deleteSpecialist.pending, (state) => {
        // console.log(state);
      });
  },
});

export const {} = listSpecialistSlice.actions;
export default listSpecialistSlice.reducer;
