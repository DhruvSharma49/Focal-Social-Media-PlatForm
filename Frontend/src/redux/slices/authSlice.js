import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
initialState: {
  user: null,
  isAuth: false,
},
reducers: {
  loginSuccess: (state, action) => {
    state.user = action.payload.user;
    state.isAuth = true;
  },
  logout: (state) => {
    state.user = null;
    state.isAuth = false;
  },
}

});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
