import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { AxiosError } from 'axios'
import axios from 'axios'

import type { Additive } from '@/common'

import type { RootState } from '../common/store'

export interface AdditivesState {
  additives: Additive[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string
}

const initialState: AdditivesState = {
  additives: [],
  error: '',
  status: 'idle'
}

const BASE_URL = 'http://localhost:8080/add'

export const fetchAdditives = createAsyncThunk<AdditivesState, string, { rejectValue: AxiosError }>(
  'additivesThunk',
  async (query: string, { rejectWithValue }) => {
    const queryParams = new URLSearchParams({
      add: query
    })
    try {
      const response = await axios.get<AdditivesState>(`${BASE_URL}?${queryParams}`)
      return response.data
    } catch (e) {
      return rejectWithValue(e as AxiosError)
    }
  }
)

export const additivesSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(fetchAdditives.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchAdditives.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.additives = action.payload.additives.sort(
        (a, b) => parseInt(a.code.slice(1)) - parseInt(b.code.slice(1))
      )
      state.error = ''
    })
    builder.addCase(fetchAdditives.rejected, (state, action) => {
      state.status = 'failed'
      state.additives = []
      if (action.payload) {
        if (action.payload.response?.status === 404) {
          state.error = 'Добавка не найдена'
        } else {
          state.error = action.payload.response?.statusText || 'unknown error'
        }
      } else {
        state.error = action.error.message || 'unknown error'
      }
    })
  },
  initialState,
  name: 'additivesSlice',
  reducers: {
    clearAdditives: (state) => ({ ...state, additives: [] })
  }
})

export const getAdditives = (state: RootState) => state.additives

export const { clearAdditives } = additivesSlice.actions

export default additivesSlice.reducer
