import { configureStore } from "@reduxjs/toolkit";
import AiReducer from './reducers/AiReducer'

const store = configureStore({
    reducer: {
        ai: AiReducer
    }
})

export {store}