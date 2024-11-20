import { takeEvery, call, put } from "redux-saga/effects";
import { 
    postGLAccountTabSuccess,  postGLAccountTabError,} from "../Actions/Account";
import * as actions from "../actionTypes";
import axiosCall from "../../services/index";
import { API } from "../../services/api";

function* fetchGLAccountTabSaga(action) {
    try {
      const response = yield call(axiosCall, "POST", API.GLACCOUNTTAB);
      if (response?.status === 200) {
        yield put(postGLAccountTabSuccess({ GLAccountTab: response?.data }));
      } else {
        yield put(postGLAccountTabError(response?.data?.message));
      }
    } catch (e) {
      yield put(postGLAccountTabError(e.message));
    }
  }
  
  // Watcher saga
  export function* watchGLAccountTabSaga() {
    yield takeEvery(actions.POST_GLACCOUNTTAB_REQUEST, fetchGLAccountTabSaga);
  }


