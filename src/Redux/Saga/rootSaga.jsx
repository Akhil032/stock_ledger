import { all, fork } from "redux-saga/effects";
import StagingProcessing from "./stagingProcessingSaga";
import {ErrorProcessing,updateErrorProcessing,getClassData, getLocationData} from "./errorProcessingSaga";
import {updateSystemConfig, SystemConfig} from "./systemConfigSaga";
import { DailyCountData,StageCountData,ErrorCountData } from "./dashBoardSaga";
import { DailySkuRollupData,getLocationRecData,getDeptRecData  } from "./reconciliationSaga"; 
import { InquiryData } from "./inquirySaga";
import {TransactionReversal,updateTransactionReversal,cancelTransactionReversal,getClassDataTrans, getLocationDataTrans} from "./transactionReversalSaga";
import { CostChange, updateCostChange } from "./CostChangeSaga"; 
import {GlAccount,updateGlAccount,GLcurrency} from "./glaccountSaga";
import {GlAccountcreation} from "./glaccountSagacreation";
import {FinanceInterface} from "./FinanceInterfaceSaga";
import { DailyView } from "./DailyViewSaga";
import {SubLedgerCost} from "./subLedgerCostSaga";
import {SysConfigcreation,GlPrimary} from "./SysConfigCreationSaga";
import { HIERData,HIER2Data,HIER3Data,UDAData,ItemListHead,ITEMPARENTData,DIFFData,
  SkuData,likeItemTableData,insertLikeItemData,allocIDs ,allocHDetails} from "./AllocationSaga";
export function* rootSaga() {
  yield all([
    fork(StagingProcessing),
    fork(ErrorProcessing),
    fork(updateErrorProcessing),
    fork(getClassData),
    fork(getLocationData),
    fork(SystemConfig),
    fork(updateSystemConfig),
    fork(DailyCountData),
    fork(StageCountData),
    fork(ErrorCountData),
    fork(DailySkuRollupData),
    fork(getDeptRecData),
    fork(getLocationRecData),
    fork(InquiryData),
    fork(TransactionReversal),
    fork(updateTransactionReversal),
    fork(getClassDataTrans),
    fork(getLocationDataTrans),
    fork(cancelTransactionReversal),
    fork(CostChange),
    fork(updateCostChange),
    fork(updateGlAccount),
    fork(GlAccount),
    fork(GLcurrency),
    fork(GlAccountcreation),
    fork(FinanceInterface),
    fork(DailyView),
    fork(SubLedgerCost),
    fork(SysConfigcreation),
    fork(GlPrimary),
    fork(HIERData),
    fork(HIER2Data),
    fork(HIER3Data),
    fork(UDAData),
    fork(ItemListHead),
    fork(ITEMPARENTData),
    fork(DIFFData),
    fork(SkuData),
    fork(likeItemTableData),
    fork(insertLikeItemData),
    fork(allocIDs),
    fork(allocHDetails),
  ]);
}
