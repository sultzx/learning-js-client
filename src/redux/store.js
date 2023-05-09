import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './slices/user.js'
import { bootcampReducer } from './slices/bootcamp.js'


const store = configureStore({
    reducer: {
        user: userReducer,
        bootcamp: bootcampReducer
    }
})

export default store