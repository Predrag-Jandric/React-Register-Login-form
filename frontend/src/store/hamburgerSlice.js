import { createSlice } from '@reduxjs/toolkit';

const hamburgerSlice = createSlice({
	name: 'hamburger',
	initialState: {
		isMenuOpen: false,
	},
	reducers: {
		toggleMenu: (state) => {
			state.isMenuOpen = !state.isMenuOpen
		},
	},
});

export const { toggleMenu } = hamburgerSlice.actions
export default hamburgerSlice.reducer;
