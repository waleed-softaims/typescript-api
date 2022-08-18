import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../reactStore/store'
import getStudentsFromClass from './integration/fetchData'

const GET_STUDENT = 'records/GET_STUDENT'

export type RecordState = {
	records: any[]
}

const initialState: RecordState = {
	records: [],
}

export const getStudentsList = createAsyncThunk(GET_STUDENT, async (name: string) => {
	const result = await getStudentsFromClass(name)
	return result
})

export const airtableSlice = createSlice({
	name: 'records',
	initialState,

	reducers: {
		logout: state => {
			state.records = []
		},
	},
	extraReducers: builder => {
		builder.addCase(getStudentsList.fulfilled, (state, action) => {
			const { payload } = action
			state.records = [...state.records, ...payload]
		})
	},
})

export const { logout } = airtableSlice.actions

export const recordList = (state: RootState) => state.records

export default airtableSlice.reducer
