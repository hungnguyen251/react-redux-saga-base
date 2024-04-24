import { PayloadAction } from "@reduxjs/toolkit";
import { delay, put, takeEvery } from "redux-saga/effects";
import { incrementSaga, incrementSagaSuccess } from "./counterSlice";

// eslint-disable-next-line require-yield
export function* log(action: PayloadAction) {
    console.log('LOG: ', action);
    
}

function* handleIncrementSaga(action: PayloadAction<number>) {
    console.log('Waiting 2s');
    yield delay(2000);
    
    console.log('Waiting done');
    yield put(incrementSagaSuccess(action.payload))
    
}

export default function* counterSaga() {
    yield takeEvery(incrementSaga.toString(), handleIncrementSaga);
}