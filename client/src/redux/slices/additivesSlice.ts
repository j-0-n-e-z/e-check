import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { AxiosError } from 'axios'
import axios from 'axios'

import type { Additive } from '@/common'

import type { RootState } from '../common/store'

export interface AdditivesState {
  additives: Additive[]
  status: 'idle' | 'pending'
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
  async (query, thunkApi) => {
    const queryParams = new URLSearchParams({
      add: query
    })
    try {
      const response = await axios.get<AdditivesState>(`${BASE_URL}?${queryParams}`)
      return response.data
    } catch (e) {
      return thunkApi.rejectWithValue(e as AxiosError)
    }
  }
)

export const additivesSlice = createSlice({
  extraReducers: (builder) => {
    builder.addCase(fetchAdditives.pending, (state) => {
      if (state.status === 'idle') {
        state.status = 'pending'
      }
    })
    builder.addCase(fetchAdditives.fulfilled, (state, action) => {
      if (state.status === 'pending') {
        state.status = 'idle'
        state.additives = action.payload.additives.sort(
          (a, b) => parseInt(a.code.slice(1)) - parseInt(b.code.slice(1))
        )
        state.error = ''
      }
    })
    builder.addCase(fetchAdditives.rejected, (state, action) => {
      if (state.status === 'pending') {
        state.status = 'idle'
        state.additives = []
        if (action.payload) {
          if (action.payload.response?.status === 404) {
            state.error = 'Добавка не найдена'
          } else {
            state.error = action.payload.message
          }
        } else {
          console.log(action.error)
          state.error = action.error.message || 'unknown error'
        }
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
