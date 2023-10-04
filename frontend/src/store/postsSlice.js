import { createSlice } from '@reduxjs/toolkit';

const postsSlice = createSlice({
	name: 'posts',
	initialState: {
		count: null,
		allPosts: [],
		addRemoveLikes: false,
	},
	reducers: {
		getPostHendler: (state, action) => {
			state.count = action.payload.count;
			state.allPosts = action.payload.posts;
		},
		addRemoveLikesAction: (state, action) => {
			state.addRemoveLikes = !state.addRemoveLikes;
		},
	},
});

export const { getPostHendler, addRemoveLikesAction } =
	postsSlice.actions;
export default postsSlice.reducer;
