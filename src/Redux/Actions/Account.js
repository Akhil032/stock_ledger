import * as actions from '../actionTypes';
import { createAction } from '@reduxjs/toolkit';

export const postGLAccountTabRequest = createAction(actions.POST_GLACCOUNTTAB_REQUEST);
export const postGLAccountTabSuccess = createAction(actions.POST_GLACCOUNTTAB_SUCCESS);
export const postGLAccountTabError = createAction(actions.POST_GLACCOUNTTAB_ERROR);