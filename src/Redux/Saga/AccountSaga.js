import { takeEvery, call, put } from "redux-saga/effects";
import { 
    postGLAccountTabSuccess,  postGLAccountTabError,
    postGLAccountUpdSuccess,  postGLAccountUpdError,} from "../Actions/Account";
import * as actions from "../actionTypes";
import axiosCall from "../../services/index";
import { API } from "../../services/api";

function* fetchGLAccountTabSaga(action) {
    try {
      const response = yield call(axiosCall, "POST", API.GLACCOUNTTAB,action.payload);
      if (response?.status === 200) {
        yield put(postGLAccountTabSuccess({ GLAccountTab: response?.data }));
      } else {
        yield put(postGLAccountTabError(response?.data?.message));
      }
    } catch (e) {
      yield put(postGLAccountTabError(e.message));
    }
  }
  function* fetchGLAccountUpdSaga(action) {
    try {
      const response = yield call(axiosCall, "POST", API.GLACCOUNTUPD,action.payload);
      if (response?.status === 200) {
        yield put(postGLAccountUpdSuccess({ GLAccountUpd: response?.data }));
      } else {
        yield put(postGLAccountUpdError(response?.data?.message));
      }
    } catch (e) {
      yield put(postGLAccountUpdError(e.message));
    }
  }
  
  
  // Watcher saga
  export function* watchGLAccountTabSaga() {
    yield takeEvery(actions.POST_GLACCOUNTTAB_REQUEST, fetchGLAccountTabSaga);
  }

  
  // Watcher saga
  export function* watchGLAccountUpdSaga() {
    yield takeEvery(actions.POST_GLACCOUNTUPD_REQUEST, fetchGLAccountUpdSaga);
  }


