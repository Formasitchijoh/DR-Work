import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { User } from "../../Models/User";

export interface AuthState {
  user: null | User;
  loading:boolean
}

const initialState: AuthState = {
  user: null,
  loading:false
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});
 

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;