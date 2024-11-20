import { takeEvery, call, put } from "redux-saga/effects";
import { 
  getDailyCountSuccess, getDailyCountError,
  getStageCountSuccess, getStageCountError,
  getErrorCountSuccess, getErrorCountError,
 } from "../Actions/dashboard";
import * as actions from "../actionTypes";
import axiosCall from "../../services/index";
import { API } from "../../services/api";

function* fetchDailyCountSaga(action) {
  try {
    const response = yield call(axiosCall, "GET", API.DAILYCOUNTDATA);
    if (response?.status === 200) {
      yield put(getDailyCountSuccess({ DailyCount: response?.data }));
    } else {
      yield put(getDailyCountError(response?.data?.message));
    }
  } catch (e) {
    yield put(getDailyCountError(e.message));
  }
}
function* fetchStageCountSaga(action) {
  try {
    const response = yield call(axiosCall, "GET", API.STAGECOUNTDATA);
    if (response?.status === 200) {
      yield put(getStageCountSuccess({ StageCount: response?.data }));
    } else {
      yield put(getStageCountError(response?.data?.message));
    }
  } catch (e) {
    yield put(getStageCountError(e.message));
  }
}

function* fetchErrorCountSaga(action) {
  try {
    const response = yield call(axiosCall, "GET", API.ERRORCOUNTDATA);
    if (response?.status === 200) {
      yield put(getErrorCountSuccess({ ErrorCount: response?.data }));
    } else {
      yield put(getErrorCountError(response?.data?.message));
    }
  } catch (e) {
    yield put(getErrorCountError(e.message));
  }
}

// Watcher saga that listens for FETCH_DAILY_COUNT action
export function* watchDailyCountData() {
  yield takeEvery(actions.GET_DAILYCOUNT_REQUEST, fetchDailyCountSaga);
}
// Watcher sagas that listen for GET_STAGECOUNT_REQUEST and GET_ERRORCOUNT_REQUEST actions
export function* watchStageCountData() {
  yield takeEvery(actions.GET_STAGECOUNT_REQUEST, fetchStageCountSaga);
}

export function* watchErrorCountData() {
  yield takeEvery(actions.GET_ERRORCOUNT_REQUEST, fetchErrorCountSaga);
}


