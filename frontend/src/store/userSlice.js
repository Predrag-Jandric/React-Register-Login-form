import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
	name: 'user',
	initialState: {
		user: {},
	},
	reducers: {
		loginUser: (state, action) => {
			state.user = action.payload;
			localStorage.setItem('sm_user', JSON.stringify(action.payload));
		},
		restoreUser: (state, action) => {
			state.user = action.payload;
		},
		logoutUser: (state, action) => {
			state.user = {};
			localStorage.removeItem('sm_user');
			localStorage.removeItem('sm_token');
		},
	},
});

export const { loginUser, restoreUser, logoutUser } =
	userSlice.actions;
export default userSlice.reducer;
