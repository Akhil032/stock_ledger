import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./Reducers/rootReducer"; // Combined reducers
import { rootSaga } from "./Saga/rootSaga"; // Root saga

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the store
const store = configureStore({
    reducer: rootReducer, // Attach the root reducer
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: false, // Disable Redux Thunk since we're using Redux-Saga
        }).concat(sagaMiddleware), // Add saga middleware
});

// Run the root saga
sagaMiddleware.run(rootSaga);

export default store;
