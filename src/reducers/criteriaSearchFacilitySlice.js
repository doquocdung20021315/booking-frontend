import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  locationID: "",
};

const criteriaSearchFacilitySlice = createSlice({
  name: "criteriaSearchFacility",
  initialState,
  reducers: {
    setCriteriaSearchFacility: (state, action) => {
      state = action.payload;
      return state;
    },
  },
  extraReducers() {},
});

export const { setCriteriaSearchFacility } = criteriaSearchFacilitySlice.actions;
export default criteriaSearchFacilitySlice.reducer;
