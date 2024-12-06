import * as actions from '../actionTypes';
import { createAction } from '@reduxjs/toolkit';

export const postERRTABDATARequest = createAction(actions.POST_ERRTABDATA_REQUEST);
export const postERRTABDATASuccess = createAction(actions.POST_ERRTABDATA_SUCCESS);
export const postERRTABDATAError = createAction(actions.POST_ERRTABDATA_ERROR);