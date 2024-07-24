import { combineReducers } from "@reduxjs/toolkit";
import formReducer from "../slices/formSlice"

const rootReducer = combineReducers({
    formSlice:formReducer,
})

export default rootReducer;