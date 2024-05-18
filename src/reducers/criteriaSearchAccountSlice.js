import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accountId: "",
  roleId: "",
  facilityID: null,
};

const criteriaSearchAccountSlice = createSlice({
  name: "criteriaSearchAccount",
  initialState,
  reducers: {
    setCriteriaSearchAccount: (state, action) => {
      state = action.payload;
      return state;
    },
  },
  extraReducers() {},
});

export const { setCriteriaSearchAccount } = criteriaSearchAccountSlice.actions;
export default criteriaSearchAccountSlice.reducer;
