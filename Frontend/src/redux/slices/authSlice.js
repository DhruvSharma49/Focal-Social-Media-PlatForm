// import { createSlice } from "@reduxjs/toolkit";

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     token: localStorage.getItem("token") || null,
//     user: null,
//     isAuth: !!localStorage.getItem("token"),
//   },
//   reducers: {
//     loginSuccess: (state, action) => {
//       state.token = action.payload;
//       state.user = null;
//       state.isAuth = true;
//       localStorage.setItem("token", action.payload);
//     },
//     logout: (state) => {
//       state.token = null;
//       state.user = null;
//       state.isAuth = false;
//       localStorage.removeItem("token");
//     },
//   },
// });

// export const { loginSuccess, logout } = authSlice.actions;
// export default authSlice.reducer;


// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    isAuth: !!localStorage.getItem("token"),
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload; // sirf token
      state.isAuth = true;
      localStorage.setItem("token", action.payload);
    },
    logout: (state) => {
      state.token = null;
      state.isAuth = false;
      localStorage.removeItem("token");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;

