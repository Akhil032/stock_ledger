import * as actions from '../actionTypes';
const initialState = {
    isLoading: false,
    data: [],
    isError: false,
    message: "",
    isSuccess: false,
};

const DashboardReducers = (state = initialState, action) => {

    switch (action.type) {
        case actions.GET_DAILYCOUNT_REQUEST:
        case actions.GET_STAGECOUNT_REQUEST:
        case actions.GET_ERRORCOUNT_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                message: "",
                isSuccess: false,
            };
        case actions.GET_DAILYCOUNT_ERROR:
        case actions.GET_STAGECOUNT_ERROR:
        case actions.GET_ERRORCOUNT_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                message: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_DAILYCOUNT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: true,
            };

        case actions.GET_STAGECOUNT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: true,
            };

        case actions.GET_ERRORCOUNT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                message: action.payload?.Data?.message,
                isSuccess: true,
            };

        default:
            return { ...state };
    }
};

export default DashboardReducers;
