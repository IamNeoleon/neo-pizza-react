import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../store';


type GetPizzaArgs = {
    currentPage: number,
    category: string,
    sort: string,
    search: string
}

type PizzaItem = {
    id: number,
    imageUrl: string,
    title: string,
    types: number[],
    sizes: number[],
    price: number,
    rating: number,
}

type PizzaResponseMeta = {
    current_page: number,
    per_page: number,
    remaining_count: number,
    total_items: number,
    total_pages: number
}

interface PizzaResponse {
    items: PizzaItem[],
    meta: PizzaResponseMeta
}

export const getPizza = createAsyncThunk<PizzaResponse, GetPizzaArgs, { rejectValue: string }>(
    'pizza/getPizzaStatus',
    async (params: GetPizzaArgs, thunkAPI) => {
        const { currentPage, category, sort, search } = params;

        const { data } = await axios.get<PizzaResponse>(`https://f0c873f136c0badd.mokky.dev/pizzas?page=${currentPage}&limit=8${category}${sort}${search}`)
        if (data.items.length == 0) {
            return thunkAPI.rejectWithValue('Пиццы пустые')
        }

        return thunkAPI.fulfillWithValue(data)
    },
)

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

interface PizzaSliceState {
    items: PizzaItem[];
    totalPages: number
    status: Status
}

const initialState: PizzaSliceState = {
    items: [],
    totalPages: 0,
    status: Status.LOADING
}

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPizza.pending, (state) => {
                state.status = Status.LOADING
                state.items = []
            })
            .addCase(getPizza.fulfilled, (state, action) => {
                state.items = action.payload.items;
                state.totalPages = action.payload.meta.total_pages;
                state.status = Status.SUCCESS
            })
            .addCase(getPizza.rejected, (state) => {
                state.status = Status.ERROR
                state.items = []
            })
    }
})

export const selectPizza = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer;

