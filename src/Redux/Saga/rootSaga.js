import { all, fork } from "redux-saga/effects";
import { watchDailyCountData, watchStageCountData, watchErrorCountData } from "./dboardSaga";
import { watchCurrencyGLSaga } from "./globalSaga";
import { watchGLAccountTabSaga } from "./AccountSaga";
export function* rootSaga() {
  yield all([
    fork(watchDailyCountData),
    fork(watchStageCountData),
    fork(watchErrorCountData),
    fork(watchCurrencyGLSaga),
    fork(watchGLAccountTabSaga),
  ]);
}