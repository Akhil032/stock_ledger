import * as actions from "../constant";
const initialState = {
  isLoading: false,
  data: [],
  isError: false,
  message: "",
  isSuccess: false,
};

const SystemConfigReducers = (state = initialState, action) => {

  switch (action.type) {
    case actions.GET_SYSTEMCONFIG_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: "",
        isSuccess: false,
      };

    case actions.GET_SYSTEMCONFIG_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        isError: false,
        message: action.payload?.Data?.message,
        isSuccess: false,
      };

    case actions.GET_SYSTEMCONFIG_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload?.Data?.message,
        isSuccess: false,
      };
      case actions.POST_SYSTEMCONFIG_REQUEST:
        return {
          ...state,
          isLoading: true,
          isError: false,
          message: "",
          isSuccess: false,
        };
  
      case actions.POST_SYSTEMCONFIG_SUCCESS:
        return {
          ...state,
          isLoading: false,
          data: action.payload,
          isError: false,
          message: action.payload?.Data?.message,
          isSuccess: true,
        };
      case actions.POST_SYSTEMCONFIG_ERROR:
        return {
          ...state,
          isLoading: false,
          isError: true,
          message: action.payload?.Data?.message,
          isSuccess: false,
        };
      case actions.RESET_SYSTEMCONFIG:
      return {
        isLoading: false,
        data: [],
        isError: false,
        message: '',
        isSuccess: false,
      };
    default:
      return { ...state };
  }
};

export default SystemConfigReducers;
