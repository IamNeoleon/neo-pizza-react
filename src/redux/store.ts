import { configureStore } from '@reduxjs/toolkit'


import filterSlice from './slices/filterSlice.js'
import cartSlice from './slices/cartSlice.js'
import pizzaSlice from './slices/pizzaSlice.js'
import { useDispatch } from 'react-redux'


export const store = configureStore({
    reducer: {
        filter: filterSlice,
        cart: cartSlice,
        pizza: pizzaSlice
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export default store

