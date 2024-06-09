import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store';

type Sort = {
    name: string,
    sortProperty: string
}

export interface FilterState {
    categoryId: number,
    currentPage: number,
    searchValue: string,
    sort: Sort,
}

const initialState: FilterState = {
    categoryId: 0,
    sort: { name: 'популярности', sortProperty: 'rating' },
    currentPage: 1,
    searchValue: ''
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload;
        },
        setSort(state, action: PayloadAction<Sort>) {
            state.sort = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
        setFilters(state, action: PayloadAction<FilterState>) {
            state.currentPage = Number(action.payload.currentPage);
            state.categoryId = Number(action.payload.categoryId);
            state.sort = action.payload.sort;
        },

    },
})

export const selectFilter = (state: RootState) => state.filter;

export const { setCategoryId, setSort, setCurrentPage, setSearchValue, setFilters } = filterSlice.actions


export default filterSlice.reducer;