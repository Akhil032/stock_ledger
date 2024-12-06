import * as actions from '../actionTypes';
const initialState = {
  isLoading: false,
  data: [],
  isError: false,
  message: "",
  isSuccess: false,
};
const TransactionTabReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.POST_ERRTABDATA_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: "",
        isSuccess: false,
      };

    case actions.POST_ERRTABDATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        isError: false,
        message: action.payload?.Data?.message,
        isSuccess: true,
      };

    case actions.POST_ERRTABDATA_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload,
        isSuccess: false,
      };

    default:
      return state;
  }
};

export default TransactionTabReducer;