import { PayloadAction } from "@reduxjs/toolkit";
import { LoginPayload, authActions } from "./authSlice";
import { call, fork, put, take, takeLatest } from "redux-saga/effects";
import authApi from "api/authApi";

function* handleLogin(payload: any): any {
    try {
        if (!payload.payload) {
            return
        }

        const data = {
            ...payload.payload,
        }

        const response = yield call(authApi.login, data)
        if (response) {
            localStorage.setItem('access_token', response.token)
            yield put(authActions.loginSuccess(response))
        }

    } catch (err: any) {
        console.log(err)
        yield put(authActions.loginFailed(err.message));
    }
}

// eslint-disable-next-line require-yield
function* handleLogout() {
    localStorage.removeItem('access_token');
}

function* watchLoginFlow() {
    while (true) {
        const isLoggedIn = Boolean(localStorage.getItem('access_token'));
        if (!isLoggedIn) {
            const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
            yield fork(handleLogin, action.payload);
        }
    
        yield take(authActions.logout.type);
        yield call(handleLogout);
    }
}

export function* authSaga() {
    yield fork(watchLoginFlow);
    yield takeLatest(authActions.login, handleLogin)
}