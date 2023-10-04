import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import hamburgerReducer from './hamburgerSlice';
import postsSlice from './postsSlice';

const store = configureStore({
	reducer: {
		userStore: userSlice,
		hamburgerStore: hamburgerReducer,
		postsStore: postsSlice,
	},
});

export default store;