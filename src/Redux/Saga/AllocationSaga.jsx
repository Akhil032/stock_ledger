import { call, put, takeLatest } from "redux-saga/effects";
import {
    getHIERSuccess,
    getHIERError,
    getHIER2Success,
    getHIER2Error,
    getHIER3Success,
    getHIER3Error,
    getUDASuccess,
    getUDAError,
    getITEM_LIST_HEADSuccess,
    getITEM_LIST_HEADError,
    getITEMPARENTSuccess,
    getITEMPARENTError,
    getDIFFSuccess,
    getDIFFError,
    getSKUSuccess,
    getSKUError,
    getAllocItemsRequest,getAllocItemsSuccess,getAllocItemsError,
    postLIkeInsertError,postLIkeInsertRequest,postLIkeInsertSuccess,
} from "../Action/Allocation";
import * as actions from "../constant";
import axiosCall from "../../services/index";
import { API } from "../../services/api";

function* fetchHIERSaga(action) {
    try {
      const response = yield call(axiosCall, "POST", API.FETCHHIER,action.payload);
      if (response?.status == 200) {
        yield put(getHIERSuccess({ hierData: response?.data }));
      } else {
        yield put(getHIERError(response?.data?.message));
      }
    } catch (e) {
      yield put(getHIERError(e.message));
    }
  }
  
  export function* HIERData() {
    yield takeLatest(actions.GET_HIER_REQUEST, fetchHIERSaga);
  }
function* fetchHIER2Saga(action) {
    try {
      const response = yield call(axiosCall, "POST", API.FETCHHIER2,action.payload);
      if (response?.status == 200) {
        yield put(getHIER2Success({ hier2Data: response?.data }));
      } else {
        yield put(getHIER2Error(response?.data?.message));
      }
    } catch (e) {
      yield put(getHIER2Error(e.message));
    }
  }
  
  export function* HIER2Data() {
    yield takeLatest(actions.GET_HIER2_REQUEST, fetchHIER2Saga);
  }

function* fetchHIER3Saga(action) {
    try {
      const response = yield call(axiosCall, "POST", API.FETCHHIER3,action.payload);
      if (response?.data?.status == 500) {
        yield put(getHIER3Error(response?.data?.message));
      } else {
        yield put(getHIER3Success({ hier3Data: response?.data }));
      }
    } catch (e) {
      yield put(getHIER3Error(e.message));
    }
  }
  
  export function* HIER3Data() {
    yield takeLatest(actions.GET_HIER3_REQUEST, fetchHIER3Saga);
  }
function* fetchUDASaga(action) {
    try {
      const response = yield call(axiosCall, "POST", API.FETCHUDA,action.payload);
      if (response?.status == 200) {
        yield put(getUDASuccess({ udaData: response?.data }));
      } else {
        yield put(getUDAError(response?.data?.message));
      }
    } catch (e) {
      yield put(getUDAError(e.message));
    }
  }
  
  export function* UDAData() {
    yield takeLatest(actions.GET_UDA_REQUEST, fetchUDASaga);
  }

function* fetchItemListHeadSaga(action) {
    try {
      const response = yield call(axiosCall, "GET", API.FETCHILH,action.payload);
      if (response?.status == 200) {
        yield put(getITEM_LIST_HEADSuccess({ itemListHeadData: response?.data }));
      } else {
        yield put(getITEM_LIST_HEADError(response?.data?.message));
      }
    } catch (e) {
      yield put(getITEM_LIST_HEADError(e.message));
    }
  }
  
  export function* ItemListHead() {
    yield takeLatest(actions.GET_ITEM_LIST_HEAD_REQUEST, fetchItemListHeadSaga);
  }
function* fetchITEMPARENTSaga(action) {
    try {
      const response = yield call(axiosCall, "POST", API.FETCHITEMPRT,action.payload);
      if (response?.status == 200) {
        yield put(getITEMPARENTSuccess({ itemParentData: response?.data }));
      } else {
        yield put(getITEMPARENTError(response?.data?.message));
      }
    } catch (e) {
      yield put(getITEMPARENTError(e.message));
    }
  }
  
  export function* ITEMPARENTData() {
    yield takeLatest(actions.GET_ITEMPARENT_REQUEST, fetchITEMPARENTSaga);
  }

function* fetchDIFFSaga(action) {
    try {
      const response = yield call(axiosCall, "POST", API.FETCHDIF,action.payload);
      // console.log("response2345:",response)
      if (response?.status == 200) {
        yield put(getDIFFSuccess({ diffData: response?.data }));
      } else {
        yield put(getDIFFError(response?.data?.message));
      }
    } catch (e) {
      yield put(getDIFFError(e.message));
    }
  }
  
  export function* DIFFData() {
    yield takeLatest(actions.GET_DIFF_REQUEST, fetchDIFFSaga);
  }


function* fetchSKUSaga(action) {
    try {
      const response = yield call(axiosCall, "POST", API.FETCHSKU,action.payload);
      if (response?.status == 200) {
        yield put(getSKUSuccess({ skuData: response?.data }));
      } else {
        yield put(getSKUError(response?.data?.message));
      }
    } catch (e) {
      yield put(getSKUError(e.message));
    }
  }
  
  export function* SkuData() {
    yield takeLatest(actions.GET_SKU_REQUEST, fetchSKUSaga);
  }

function* fetchAllocItemsSaga(action) {
    try {
      const response = yield call(axiosCall, "POST", API.FECTCHALLOCITEMS,action.payload);
      if (response?.status == 200) {
        yield put(getAllocItemsSuccess({ likeItemTableData: response?.data }));
      } else {
        yield put(getAllocItemsError(response?.data?.message));
      }
    } catch (e) {
      yield put(getAllocItemsError(e.message));
    }
  }
  
  export function* likeItemTableData() {
    yield takeLatest(actions.GET_ALLOC_ITEMS_REQUEST, fetchAllocItemsSaga);
  }
function* insertLikeItem(action) {
  try {
    const response = yield call(axiosCall, "POST", API.INSERTLIKEITEM, action.payload);
    if (response?.status == 200) {
      yield put(postLIkeInsertSuccess({ insertLikeItemData: response?.data }));
    } else {
      yield put(postLIkeInsertError(response?.data?.message));
    }
  } catch (e) {
    yield put(postLIkeInsertError(e.message));
  }
}

  export function* insertLikeItemData() {
    yield takeLatest(actions.POST_LIKE_INSERT_REQUEST, insertLikeItem);
  }


