import * as actions from "../constant";
const initialState = {
  isLoading: false,
  data: [],
  isError: false,
  message: "",
  isSuccess: false,
};

const StagingProcessingReducers = (state = initialState, action) => {

  switch (action.type) {
    
    case actions.GET_STAGEPROCEESING_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        message: "",
        isSuccess: false,
      };

    case actions.GET_STAGEPROCEESING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        isError: false,
        message: action.payload?.Data?.message,
        isSuccess: true,
      };
    case actions.RESET_STAGEPROCESSING:
      return {
        ...state,
        isLoading: false,
        isError: false,
        message: '',
        isSuccess: false,
      };

    case actions.GET_STAGEPROCEESING_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload,
        isSuccess: false,
      };

    default:
      return { ...state };
  }
};

export default StagingProcessingReducers;
