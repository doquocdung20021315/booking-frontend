import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { servicesManager } from "../services/serviceManager";

const initialState = null;

export const getInfoFac = createAsyncThunk("facility/getInfoFac", async (data) => {
  const service = servicesManager.serviceAPI;
  return service?.getInfoFacility(data);
});

export const modifyFacility = createAsyncThunk("facility/modifyFacility", async (data) => {
  const service = servicesManager.serviceAPI;
  return service?.modifyFacility(data);
});

const facilitySlice = createSlice({
  name: "facility",
  initialState,
  reducers: {
    setFacility: (state, action) => {
      state = action.payload;
      return state;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getInfoFac.rejected, (state) => {
        // console.log(state);
      })
      .addCase(getInfoFac.fulfilled, (state, action) => {
        // console.log(action.payload);
        return action.payload;
      })
      .addCase(getInfoFac.pending, (state) => {
        // console.log(state);
      })
      .addCase(modifyFacility.rejected, (state) => {
        // console.log(state);
      })
      .addCase(modifyFacility.fulfilled, (state, action) => {
        // console.log(action.payload);
        return action.payload;
      })
      .addCase(modifyFacility.pending, (state) => {
        // console.log(state);
      });
  },
});

export const { setFacility } = facilitySlice.actions;
export default facilitySlice.reducer;
