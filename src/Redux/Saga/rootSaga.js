import { all, fork } from "redux-saga/effects";
import { watchDailyCountData, watchStageCountData, watchErrorCountData } from "./dboardSaga";
import { watchCurrencyGLSaga } from "./globalSaga";
import { watchGLAccountTabSaga, watchGLAccountUpdSaga } from "./AccountSaga";
import { watchERRTABDATASaga } from "./TransactionSaga";
export function* rootSaga() {
  yield all([
    fork(watchDailyCountData),
    fork(watchStageCountData),
    fork(watchErrorCountData),
    fork(watchCurrencyGLSaga),
    fork(watchGLAccountTabSaga),
    fork(watchGLAccountUpdSaga),
    fork(watchERRTABDATASaga),
  ]);
}