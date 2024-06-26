import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { servicesManager } from "../services/serviceManager";

const initialState = {
  birthday: "",
  fullname: "",
  gender: "",
  phone: "",
  email: "",
  username: "",
  _id: "",
  accountId: "",
};

export const login = createAsyncThunk("account/login", async (data) => {
  const service = servicesManager.serviceAPI;
  return service?.login(data);
});

export const register = createAsyncThunk("account/register", async (data) => {
  const service = servicesManager.serviceAPI;
  return service?.register(data);
});

export const authenticate = createAsyncThunk("account/authenticate", async (data) => {
  const service = servicesManager.serviceAPI;
  return service?.authenticate(data);
});

export const getInfoAccount = createAsyncThunk(
  "account/getInfoAccount",
  async (data) => {
    const service = servicesManager.serviceAPI;
    return service?.getInfoAccount(data);
  }
);

export const getInfoAcc = createAsyncThunk(
  "account/getInfoAcc",
  async (data) => {
    const service = servicesManager.serviceAPI;
    return service?.getInfoAcc(data);
  }
);

export const updateInfoAccount = createAsyncThunk(
  "account/updateInfoAccount",
  async (data) => {
    const service = servicesManager.serviceAPI;
    return service?.updateInfoAccount(data);
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state = action.payload;
      return state;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.rejected, (state) => {
        // console.log(state);
      })
      .addCase(login.fulfilled, (state, action) => {
        // console.log(action.payload);
        // return action.payload;
      })
      .addCase(login.pending, (state) => {
        // console.log(state);
      })
      .addCase(getInfoAccount.rejected, (state) => {
        // console.log(state);
      })
      .addCase(getInfoAccount.fulfilled, (state, action) => {
        // console.log(action.payload);
        return action.payload;
      })
      .addCase(getInfoAccount.pending, (state) => {
        // console.log(state);
      })
      .addCase(updateInfoAccount.rejected, (state) => {
        // console.log(state);
      })
      .addCase(updateInfoAccount.fulfilled, (state, action) => {
        // console.log(action.payload);
        return action.payload;
      })
      .addCase(updateInfoAccount.pending, (state) => {
        // console.log(state);
      });
  },
});

export const { setLogin } = accountSlice.actions;
export default accountSlice.reducer;
