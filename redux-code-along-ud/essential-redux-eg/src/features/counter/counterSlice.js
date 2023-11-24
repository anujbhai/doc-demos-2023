import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { fetchCount } from "./counterAPI";

const initialState = {
	value: 0,
	status: 'idle',
}

export const incrementAsync = createAsyncThunk(
	'counter/fetchCounter',
	async (amount) => {
		const response = await fetchCount(amount)

		return response.data
	}
)

export const counterSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		increment: (state) => {
			state.value += 1
		},
		decrement: (state) => {
			if (state.value === 0) {
				return
			}

			state.value -= 1
		},
		incrementByAmount: (state, action) => {
			state.value += action.payload
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(incrementAsync.pending, (state) => {
				state.status = 'loading'	
			})
			.addCase(incrementAsync.fulfilled, (state, action) => {
				state.status = 'idle'
				state.value += action.payload
			})
	}
})

export const {increment, decrement, incrementByAmount} = counterSlice.actions

export const selectCount = state => state.counter.value

export const selectFetchStatus = (state) => state.counter.status

export default counterSlice.reducer

