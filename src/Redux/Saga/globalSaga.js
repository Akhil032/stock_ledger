import { takeEvery, call, put } from "redux-saga/effects";
import { 
    postCurrencyGLSuccess, postCurrencyGLError,} from "../Actions/global";
import * as actions from "../actionTypes";
import axiosCall from "../../services/index";
import { API } from "../../services/api";

function* fetchCurrencyGLSaga(action) {
    try {
      const response = yield call(axiosCall, "POST", API.CURRENCYGL);
      if (response?.status === 200) {
        yield put(postCurrencyGLSuccess({ CurrencyGL: response?.data }));
      } else {
        yield put(postCurrencyGLError(response?.data?.message));
      }
    } catch (e) {
      yield put(postCurrencyGLError(e.message));
    }
  }
  
  // Watcher saga
  export function* watchCurrencyGLSaga() {
    yield takeEvery(actions.POST_CURRENCYGL_REQUEST, fetchCurrencyGLSaga);
  }


