// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** API Routes
import api from '../../../router/routes/api'

// ** Axios Imports
import axios from 'axios'

export const getCurrencies = createAsyncThunk('currencies/getCurrencies', async params => {
  const response = await axios.get(
    `${api.endpoint + api.routes.currencies.index}`,
    { params }
  )
  return {
    params,
    data: response.data.data,
    total: response.data.info.total
  }
})

export const getCurrency = createAsyncThunk('currencies/getCurrency', async slug => {
  const response = await axios.get(
    `${api.endpoint + api.routes.currencies.index}/${slug}`,
  )
  return response.data
})

export const currencySlice = createSlice({
  name: 'currencies',
  initialState: {
    data: [],
    total: 0,
    params: {},
    allData: [],
    selected: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getCurrencies.fulfilled, (state, action) => {
        state.data = action.payload.data
        state.params = action.payload.params
        state.total = action.payload.total
      })
      .addCase(getCurrency.fulfilled, (state, action) => {
        state.selected = action.payload
      })
  }
})

export default currencySlice.reducer