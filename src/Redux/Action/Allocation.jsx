import { createAction } from "redux-actions";
import * as actions from "../constant";



export const getDIFFRequest = createAction(
actions.GET_DIFF_REQUEST
);
export const getDIFFSuccess = createAction(
actions.GET_DIFF_SUCCESS
);
export const getDIFFError = createAction(
actions.GET_DIFF_ERROR
);
export const getSKURequest = createAction(
actions.GET_SKU_REQUEST
);
export const getSKUSuccess = createAction(
actions.GET_SKU_SUCCESS
);
export const getSKUError = createAction(
actions.GET_SKU_ERROR
);
export const getITEM_LIST_HEADRequest = createAction(
actions.GET_ITEM_LIST_HEAD_REQUEST
);
export const getITEM_LIST_HEADSuccess = createAction(
actions.GET_ITEM_LIST_HEAD_SUCCESS
);
export const getITEM_LIST_HEADError = createAction(
actions.GET_ITEM_LIST_HEAD_ERROR
);
export const getUDARequest = createAction(
actions.GET_UDA_REQUEST
);
export const getUDASuccess = createAction(
actions.GET_UDA_SUCCESS
);
export const getUDAError = createAction(
actions.GET_UDA_ERROR
);

export const getHIERRequest = createAction(
actions.GET_HIER_REQUEST
);
export const getHIERSuccess = createAction(
actions.GET_HIER_SUCCESS
);
export const getHIERError = createAction(
actions.GET_HIER_ERROR
);

export const getITEMPARENTRequest = createAction(
actions.GET_ITEMPARENT_REQUEST
);
export const getITEMPARENTSuccess = createAction(
actions.GET_ITEMPARENT_SUCCESS
);
export const getITEMPARENTError = createAction(
actions.GET_ITEMPARENT_ERROR
);
export const getHIER2Request = createAction(
actions.GET_HIER2_REQUEST
);
export const getHIER2Success = createAction(
actions.GET_HIER2_SUCCESS
);
export const getHIER2Error = createAction(
actions.GET_HIER2_ERROR
);
export const getHIER3Request = createAction(
actions.GET_HIER3_REQUEST
);
export const getHIER3Success = createAction(
actions.GET_HIER3_SUCCESS
);
export const getHIER3Error = createAction(
actions.GET_HIER3_ERROR
);

export const getAllocItemsRequest = createAction(
actions.GET_ALLOC_ITEMS_REQUEST
);
export const getAllocItemsSuccess = createAction(
actions.GET_ALLOC_ITEMS_SUCCESS
);
export const getAllocItemsError = createAction(
actions.GET_ALLOC_ITEMS_ERROR
);

export const postLIkeInsertRequest = createAction(
    actions.POST_LIKE_INSERT_REQUEST
);
export const postLIkeInsertSuccess = createAction(
    actions.POST_LIKE_INSERT_SUCCESS
);
export const postLIkeInsertError = createAction(
    actions.POST_LIKE_INSERT_ERROR
);
