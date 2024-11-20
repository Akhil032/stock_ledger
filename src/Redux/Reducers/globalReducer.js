import * as actions from '../actionTypes';
const initialState = {
    isLoading: false,
    data: [],
    isError: false,
    message: "",
    isSuccess: false,
};

const GlobalReducers = (state = initialState, action) => {
  
    switch (action.type) {
      case actions.POST_CURRENCYGL_REQUEST:
        return {
          ...state,
          isLoading: true,
          isError: "yellow",
          message: "",
          isSuccess: false,
        };
  
      case actions.POST_CURRENCYGL_SUCCESS:
        return {
          ...state,
          isLoading: false,
          data: action.payload,
          isError: "red",
          message: action.payload?.Data?.message,
          isSuccess: true,
        };
  
      case actions.POST_CURRENCYGL_ERROR:
        return {
          ...state,
          isLoading: false,
          isError: "green",
          message: action.payload?.Data?.message,
          isSuccess: false,
        };
  
      default:
        return state;
    }
  };
  
  export default GlobalReducers;