import { takeEvery, call, put } from "redux-saga/effects";
import { 
    postERRTABDATASuccess,  postERRTABDATAError,} from "../Actions/Transaction";
import * as actions from "../actionTypes";
import axiosCall from "../../services/index";
import { API } from "../../services/api";

function* fetchERRTABDATASaga(action) {
    try {
      const response = yield call(axiosCall, "POST", API.ERRTABDATA,action.payload);
      if (response?.status === 200) {
        yield put(postERRTABDATASuccess({ errTabData: response?.data }));
      } else {
        yield put(postERRTABDATAError(response?.data?.message));
      }
    } catch (e) {
      yield put(postERRTABDATAError(e.message));
    }
  }
  
  // Watcher saga
  export function* watchERRTABDATASaga() {
    yield takeEvery(actions.POST_ERRTABDATA_REQUEST, fetchERRTABDATASaga);
  }

  
  
