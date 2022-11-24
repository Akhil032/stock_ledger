import * as actions from "../constant";
const initialState = {
  isLoading: false,
  data: [],
  isError: false,
  messgae: "",
  isSuccess: false,
};

const AllocationReducers = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_HIER_REQUEST:
        return {
            ...state,
            isLoading: true,
            isError: false,
            messgae: "",
            isSuccess: false,
        };

        case actions.GET_HIER_SUCCESS:
        return {
            ...state,
            isLoading: false,
            data: action.payload,
            isError: false,
            messgae: action.payload?.Data?.message,
            isSuccess: false,
        };

        case actions.GET_HIER_ERROR:
        return {
            ...state,
            isLoading: false,
            isError: true,
            messgae: action.payload?.Data?.message,
            isSuccess: false,
        };
        case actions.GET_HIER2_REQUEST:
        return {
            ...state,
            isLoading: true,
            isError: false,
            messgae: "",
            isSuccess: false,
        };

        case actions.GET_HIER2_SUCCESS:
        return {
            ...state,
            isLoading: false,
            data: action.payload,
            isError: false,
            messgae: action.payload?.Data?.message,
            isSuccess: false,
        };

        case actions.GET_HIER2_ERROR:
        return {
            ...state,
            isLoading: false,
            isError: true,
            messgae: action.payload?.Data?.message,
            isSuccess: false,
        };
        case actions.GET_HIER3_REQUEST:
        return {
            ...state,
            isLoading: true,
            isError: false,
            messgae: "",
            isSuccess: false,
        };

        case actions.GET_HIER3_SUCCESS:
        return {
            ...state,
            isLoading: false,
            data: action.payload,
            isError: false,
            messgae: action.payload?.Data?.message,
            isSuccess: false,
        };

        case actions.GET_HIER3_ERROR:
        return {
            ...state,
            isLoading: false,
            isError: true,
            messgae: action.payload?.Data?.message,
            isSuccess: false,
        };
        case actions.GET_UDA_REQUEST:
        return {
            ...state,
            isLoading: true,
            isError: false,
            messgae: "",
            isSuccess: false,
        };

        case actions.GET_UDA_SUCCESS:
        return {
            ...state,
            isLoading: false,
            data: action.payload,
            isError: false,
            messgae: action.payload?.Data?.message,
            isSuccess: false,
        };

        case actions.GET_UDA_ERROR:
        return {
            ...state,
            isLoading: false,
            isError: true,
            messgae: action.payload?.Data?.message,
            isSuccess: false,
        };
        case actions.GET_ITEM_LIST_HEAD_REQUEST:
        return {
            ...state,
            isLoading: true,
            isError: false,
            messgae: "",
            isSuccess: false,
        };

        case actions.GET_ITEM_LIST_HEAD_SUCCESS:
        return {
            ...state,
            isLoading: false,
            data: action.payload,
            isError: false,
            messgae: action.payload?.Data?.message,
            isSuccess: false,
        };

        case actions.GET_ITEM_LIST_HEAD_ERROR:
        return {
            ...state,
            isLoading: false,
            isError: true,
            messgae: action.payload?.Data?.message,
            isSuccess: false,
        };
        case actions.GET_ITEMPARENT_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false,
                messgae: "",
                isSuccess: false,
            };
        
            case actions.GET_ITEMPARENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                isError: false,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };
        
            case actions.GET_ITEMPARENT_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true,
                messgae: action.payload?.Data?.message,
                isSuccess: false,
            };
        case actions.GET_DIFF_REQUEST:
        return {
            ...state,
            isLoading: true,
            isError: false,
            messgae: "",
            isSuccess: false,
        };

        case actions.GET_DIFF_SUCCESS:
        return {
            ...state,
            isLoading: false,
            data: action.payload,
            isError: false,
            messgae: action.payload?.Data?.message,
            isSuccess: false,
        };

        case actions.GET_DIFF_ERROR:
        return {
            ...state,
            isLoading: false,
            isError: true,
            messgae: action.payload?.Data?.message,
            isSuccess: false,
        };
        case actions.GET_SKU_REQUEST:
        return {
            ...state,
            isLoading: true,
            isError: false,
            messgae: "",
            isSuccess: false,
        };

        case actions.GET_SKU_SUCCESS:
        return {
            ...state,
            isLoading: false,
            data: action.payload,
            isError: false,
            messgae: action.payload?.Data?.message,
            isSuccess: false,
        };

        case actions.GET_SKU_ERROR:
        return {
            ...state,
            isLoading: false,
            isError: true,
            messgae: action.payload?.Data?.message,
            isSuccess: false,
        };
        case actions.GET_ALLOC_ITEMS_REQUEST:
        return {
            ...state,
            isLoading: true,
            isError: false,
            messgae: "",
            isSuccess: false,
        };

        case actions.GET_ALLOC_ITEMS_SUCCESS:
        return {
            ...state,
            isLoading: false,
            data: action.payload,
            isError: false,
            messgae: action.payload?.Data?.message,
            isSuccess: false,
        };

        case actions.GET_ALLOC_ITEMS_ERROR:
        return {
            ...state,
            isLoading: false,
            isError: true,
            messgae: action.payload?.Data?.message,
            isSuccess: false,
        };
        case actions.POST_LIKE_INSERT_REQUEST:
        return {
            ...state,
            isLoading: true,
            isError: false,
            messgae: "",
            isSuccess: false,
        };

        case actions.POST_LIKE_INSERT_SUCCESS:
        return {
            ...state,
            isLoading: false,
            data: action.payload,
            isError: false,
            messgae: action.payload?.Data?.message,
            isSuccess: false,
        };

        case actions.POST_LIKE_INSERT_ERROR:
        return {
            ...state,
            isLoading: false,
            isError: true,
            messgae: action.payload?.Data?.message,
            isSuccess: false,
        };
        default:
            return { ...state };
        }
 };
export default AllocationReducers;