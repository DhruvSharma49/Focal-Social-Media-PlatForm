// // slices/postSlice.js
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   homePosts: [],      // Home page par random ya feed posts
//   profilePosts: [],   // Profile section par user ke posts
//   stories: [],        // Stories for top bar
//   loading: false,
//   error: null,
// };

// const postSlice = createSlice({
//   name: "posts",
//   initialState,
//   reducers: {
//     setHomePosts: (state, action) => {
//       state.homePosts = action.payload;
//     },
//     setProfilePosts: (state, action) => {
//       state.profilePosts = action.payload;
//     },
//     setStories: (state, action) => {
//       state.stories = action.payload;
//     },
//     setLoading: (state, action) => {
//       state.loading = action.payload;
//     },
//     setError: (state, action) => {
//       state.error = action.payload;
//     },
//     addPostToProfile: (state, action) => {
//       state.profilePosts.unshift(action.payload); // Naya post profile ke top par
//     },
//     addStory: (state, action) => {
//       state.stories.unshift(action.payload); // Nayi story top par
//     },
//   },
// });

// export const {
//   setHomePosts,
//   setProfilePosts,
//   setStories,
//   setLoading,
//   setError,
//   addPostToProfile,
//   addStory,
// } = postSlice.actions;

// export default postSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "posts",
  initialState: {
    homePosts: [],
    stories: [], // grouped stories
    loading: false,
    error: null,
  },
  reducers: {
    setHomePosts: (state, action) => {
      state.homePosts = action.payload;
    },
    setStories: (state, action) => {
      state.stories = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setHomePosts,
  setStories,
  setLoading,
  setError,
} = postSlice.actions;

export default postSlice.reducer;
