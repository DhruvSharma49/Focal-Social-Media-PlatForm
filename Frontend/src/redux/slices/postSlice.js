import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "posts",
  initialState: {
    profilePosts: [],
    homePosts: [],
    stories: [],
    loading: false,
    error: null,
  },
  reducers: {
    setProfilePosts: (state, action) => {
      state.profilePosts = action.payload;
    },
    setHomePosts: (state, action) => {
      state.homePosts = action.payload;
    },
    setStories: (state, action) => {
      state.stories = action.payload;
    },
  },
});

export const { setProfilePosts, setHomePosts, setStories } = postSlice.actions;
export default postSlice.reducer;
