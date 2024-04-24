import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { User } from "models/user";

export type AuthState = {
    isLoggedIn: boolean;
    logging?: boolean;
    currentUser?: User;
}

export type LoginPayload = {
    username: string;
    password: string;
}

const initialState: AuthState = {
    isLoggedIn: false,
    logging: false,
    currentUser: undefined,
}
//Declare actions, selectors, reducers
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action: PayloadAction<LoginPayload>) {
            state.logging = true;
        },
        loginSuccess(state, action: PayloadAction<User>) {
            if (action.payload) {
                state.isLoggedIn = true
                state.currentUser = action.payload
            }
            state.logging = false
        },
        loginFailed(state, action: PayloadAction<string>) {
            state.logging = false;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.currentUser = undefined;
        },
    }
})

// export actions
export const authActions = authSlice.actions;


// export selectors
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsLogging = (state: RootState) => state.auth.logging;
export const selectCurrentUser = (state: RootState) => state.auth.currentUser

const authReducer = authSlice.reducer;
export default authReducer;
