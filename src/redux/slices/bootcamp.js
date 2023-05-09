import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios.js'

export const fetchCreateBootcamp = createAsyncThunk('bootcamp/fetchCreateBootcamp', async (params, {rejectWithValue}) => {
    try {
        const  response  = await axios.post('/api/bootcamp', params)
          return response.data  
      } catch (error) {
          if (!error.response) {
              throw error
          }
          return rejectWithValue(error.response.data)
      } 
})


export const fetchParticipate = createAsyncThunk('bootcamp/fetchParticipate', async (params, {rejectWithValue}) => {
    try {
        const  response  = await axios.patch('api/bootcamp', params)
          return response.data
      } catch (error) {
          if (!error.response) {
              throw error
          }
          return rejectWithValue(error.response.data)
      }    
})

export const fetchGetBootcamps = createAsyncThunk('bootcamp/fetchGetBootcamps', async () => {
    const { data } = await axios.get('/api/bootcamp')    
    return data
})

const initialState = {
    data: null,
    items: [],
    status: 'loading',
    error: ''
}

const bootcampSlice = createSlice({
    name: 'bootcamp',
    initialState,
    reducers: {},
    
    extraReducers: {

        [fetchGetBootcamps.pending]: (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchGetBootcamps.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchGetBootcamps.rejected]: (state) => {
            state.status = 'error'
            state.data = null
        }
    }
})

export const bootcampReducer = bootcampSlice.reducer