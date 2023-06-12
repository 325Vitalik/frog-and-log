import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Models } from 'appwrite';
import { UserPreferences } from '../../common/types/user-preferences';

export interface AuthState {
	user: Models.Account<UserPreferences> | null;
}

const initialState: AuthState = {
	user: null,
};

export const authSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		signInUser: (state, action: PayloadAction<Models.Account<UserPreferences>>) => {
			state.user = action.payload;
		},
		signOutUser: state => {
			state.user = null;
		},
	},
});

export const { signInUser, signOutUser } = authSlice.actions;
