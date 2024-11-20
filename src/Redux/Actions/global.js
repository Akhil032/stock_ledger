
import { createAction } from '@reduxjs/toolkit';
import * as actions from '../actionTypes';

export const postCurrencyGLRequest = createAction(actions.POST_CURRENCYGL_REQUEST);
export const postCurrencyGLSuccess = createAction(actions.POST_CURRENCYGL_SUCCESS);
export const postCurrencyGLError = createAction(actions.POST_CURRENCYGL_ERROR);
