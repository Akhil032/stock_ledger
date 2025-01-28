import { call, put, takeLatest } from "redux-saga/effects";
import {
  getFinanceInterfaceListSuccess,
  getFinanceInterfaceError,
  
} from "../Action/financeInterface";
import * as actions from "../constant";
import axiosCall from "../../services/index";
import { API } from "../../services/api";

function* fetchDataSaga(action) {
  try {
    const response = yield call(axiosCall, "GET", API.FETCHSTGFIN,action.payload);
    if (response?.data?.status == 500) {
      yield put(getFinanceInterfaceError({Data: response?.data}));
    } else {
      yield put(getFinanceInterfaceListSuccess({ Data: response?.data }));
    }
  } catch (e) {
    yield put(getFinanceInterfaceError(e.message));
  }
}

export function* FinanceInterface() {
  yield takeLatest(actions.GET_FINANCEINTERFACE_REQUEST, fetchDataSaga);
}