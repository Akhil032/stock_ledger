import { combineReducers } from "redux";
import DashboardReducers from "./dashboardReducer";
import GlobalReducers from "./globalReducer";
import AccountTabReducer from "./AccountReducer";
const rootReducer = combineReducers({
    DashboardReducers,
    GlobalReducers,
    AccountTabReducer,
});

export default rootReducer;