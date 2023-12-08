import { Data } from "./MainReducer"
import {combineReducers, configureStore} from "@reduxjs/toolkit"

const rootReducer = combineReducers({
    Data
})

export const setupStore=()=>{
    return configureStore({
        reducer: rootReducer
    })
}