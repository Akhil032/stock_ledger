import { combineReducers } from "redux";
import DashboardReducers from "./dashboardReducer";
import GlobalReducers from "./globalReducer";
import AccountTabReducer from "./AccountReducer";
import TransactionTabReducer from "./TransactionReducer";
const rootReducer = combineReducers({
    DashboardReducers,
    GlobalReducers,
    AccountTabReducer,
    TransactionTabReducer,
});

export default rootReducer;