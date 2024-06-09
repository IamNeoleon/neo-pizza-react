import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';
import { getCartFromLS } from '../../utils/getICartFromLS';

export type CartItem = {
    id: number,
    title: string,
    price: number,
    imageUrl: string,
    type: string,
    size: number,
    count: number
}

interface CartSliceState {
    totalPrice: number;
    cartItems: CartItem[]
}

const cartData = getCartFromLS();

const initialState: CartSliceState = {
    totalPrice: cartData.totalPrice,
    cartItems: cartData.items
}


export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItem>) {
            let findItem = state.cartItems.find(item => item.id == action.payload.id);
            if (findItem) {
                findItem.count++;
            } else {
                state.cartItems.push({
                    ...action.payload,
                    count: 1
                })
            }

            state.totalPrice = state.cartItems.reduce((sum, item) => {
                return item.price * item.count + sum
            }, 0)
        },
        removeItem(state, action: PayloadAction<number>) {
            let findItem = state.cartItems.find(item => item.id == action.payload);
            if (findItem) {
                let price = findItem.price * findItem.count;
                state.totalPrice = state.totalPrice - price;
                state.cartItems = state.cartItems.filter(item => item.id !== action.payload)
                if (state.cartItems.length <= 0) {
                    state.totalPrice = 0;
                }
            }
        },
        plusItem(state, action: PayloadAction<number>) {
            let findItem = state.cartItems.find(item => item.id == action.payload);
            if (findItem) {
                findItem.count++;
                state.totalPrice += findItem.price
            }
        },
        minusItem(state, action: PayloadAction<number>) {
            let findItem = state.cartItems.find(item => item.id == action.payload);
            if (findItem) {
                findItem.count--;
                state.totalPrice -= findItem.price
            }
        },
        clearItems(state) {
            state.cartItems = []
            state.totalPrice = 0
        }
    },
})


export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: number) => (state: RootState) => state.cart.cartItems.find(item => item.id == id);

export const { addItem, removeItem, clearItems, plusItem, minusItem } = cartSlice.actions

export default cartSlice.reducer;