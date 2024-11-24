import * as actions from '../actionTypes';
import { createAction } from '@reduxjs/toolkit';

export const postGLAccountTabRequest = createAction(actions.POST_GLACCOUNTTAB_REQUEST);
export const postGLAccountTabSuccess = createAction(actions.POST_GLACCOUNTTAB_SUCCESS);
export const postGLAccountTabError = createAction(actions.POST_GLACCOUNTTAB_ERROR);

export const postGLAccountUpdRequest = createAction(actions.POST_GLACCOUNTUPD_REQUEST);
export const postGLAccountUpdSuccess = createAction(actions.POST_GLACCOUNTUPD_SUCCESS);
export const postGLAccountUpdError = createAction(actions.POST_GLACCOUNTUPD_ERROR);