import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    list: [],
  },
  reducers: {
    addNotification: (state, action) => {
      state.list.unshift(action.payload);
    },
    setNotifications: (state, action) => {
      state.list = action.payload;
    },
    clearNotifications: (state) => {
      state.list = [];
    },
    removeNotification: (state, action) => {
  state.list = state.list.filter(
    (n) => n._id !== action.payload
  );
},

    
  },
});

export const { addNotification, setNotifications, clearNotifications,removeNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
