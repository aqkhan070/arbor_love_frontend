import {configureStore} from '@reduxjs/toolkit'
import quoteReducer from './quoteSlice/index'

export const store = configureStore({
    reducer: {
        quote: quoteReducer,
    },
})
