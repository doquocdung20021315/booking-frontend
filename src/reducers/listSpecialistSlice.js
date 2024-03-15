import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { servicesManager } from "../services/serviceManager";

const initialState = null;

export const getListSpecialist = createAsyncThunk("specialist/getListSpecialist", async (data) => {
  const service = servicesManager.serviceAPI;
  return service?.getListSpecialist(data);
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
      });
  },
});

export const {} = listSpecialistSlice.actions;
export default listSpecialistSlice.reducer;
