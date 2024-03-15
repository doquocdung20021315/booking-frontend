import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { servicesManager } from "../services/serviceManager";

const initialState = null;

export const getAllFacility = createAsyncThunk("facility/getAllFacility", async () => {
  const service = servicesManager.serviceAPI;
  return service?.getAllFacility();
});

export const searchFacility = createAsyncThunk("facility/searchFacility", async (data) => {
  const service = servicesManager.serviceAPI;
  return service?.searchFacility(data);
});

const listFacilitySlice = createSlice({
  name: "facility",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllFacility.rejected, (state) => {
        // console.log(state);
      })
      .addCase(getAllFacility.fulfilled, (state, action) => {
        // console.log(action.payload);
        return action.payload;
      })
      .addCase(getAllFacility.pending, (state) => {
        // console.log(state);
      })
      .addCase(searchFacility.rejected, (state) => {
        // console.log(state);
      })
      .addCase(searchFacility.fulfilled, (state, action) => {
        // console.log(action.payload);
        return action.payload;
      })
      .addCase(searchFacility.pending, (state) => {
        // console.log(state);
      });
  },
});

export const {} = listFacilitySlice.actions;
export default listFacilitySlice.reducer;
