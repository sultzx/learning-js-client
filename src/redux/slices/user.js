import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios.js'

export const fetchLogin = createAsyncThunk('auth/fetchLogin', async (params, {rejectWithValue}) => {
    try {
        const  response  = await axios.post('/api/user/auth/login', params)
          return response.data  
      } catch (error) {
          if (!error.response) {
              throw error
          }
          return rejectWithValue(error.response.data)
      } 
})

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params, {rejectWithValue}) => {
    try {
      const  response  = await axios.post('/api/user/auth/registration', params)
        return response.data  
    } catch (error) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }    
})


export const fetchPushScores = createAsyncThunk('auth/fetchPushScores', async (params, {rejectWithValue}) => {
    try {
      const  response  = await axios.post('/api/user/auth/push-scores', params)
        return response.data  
    } catch (error) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }    
})

export const fetchUpdate = createAsyncThunk('auth/fetchUpdate', async (params, {rejectWithValue}) => {
    try {
        const  response  = await axios.patch('api/user/me/update', params)
          return response.data
      } catch (error) {
          if (!error.response) {
              throw error
          }
          return rejectWithValue(error.response.data)
      }    
})



export const fetchSetScore = createAsyncThunk('auth/fetchSetScore', async (params, {rejectWithValue}) => {
    try {
        const  response  = await axios.patch('api/user/me/set-score', params)
          return response.data
      } catch (error) {
          if (!error.response) {
              throw error
          }
          return rejectWithValue(error.response.data)
      }    
})


/////////////////////////////////////////////////////

export const fetchAuthMe= createAsyncThunk('auth/fetchAuthMe', async () => {
    const { data } = await axios.get('/api/user/me')    
    return data
})

/////////////////////////////////////////////////////

export const fetchGetAll = createAsyncThunk('auth/fetchGetAll', async () => {
    const { data } = await axios.get('/api/user/all')    
    return data
})


export const fetchGetScore = createAsyncThunk('auth/fetchGetScore', async (param, {rejectWithValue}) => {
    try {
        const  response  = await axios.get('api/user/me/get-score/' + param, )

          return response.data
      } catch (error) {
          if (!error.response) {
              throw error
          }
          return rejectWithValue(error.response.data)
      }    
})

export const fetchGetRating = createAsyncThunk('auth/fetchGetRating', async () => {
    const { data } = await axios.get('/api/user/me/get-rating')    
    return data
})

export const fetchGetAllRatings = createAsyncThunk('auth/fetchGetAllRatings', async () => {
    const { data } = await axios.get('/api/user/get-all-ratings')    
    return data
})



const initialState = {
    all_users: {
        items: [],
        status: 'loading',
        error: '' 
    } ,
    score: {
        data: null,
        items: [],
        status: 'loading',
        error: '' 
    } ,
    rating: {
        data: null,
        items: [],
        status: 'loading',
        error: '' 
    } ,
    data: null,
    status: 'loading',
    error: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null
            state.status = 'loaded'
        }
    },
    
    extraReducers: {

        [fetchGetAll.pending]: (state) => {
            state.all_users.status = 'loading'
            state.all_users.items = null
        },
        [fetchGetAll.fulfilled]: (state, action) => {
            state.all_users.status = 'loaded'
            state.all_users.items = action.payload
        },
        [fetchGetAll.rejected]: (state) => {
            state.all_users.status = 'error'
            state.all_users.items = null
        },

        [fetchGetRating.pending]: (state) => {
            state.rating.status = 'loading'
            state.rating.data = null
        },
        [fetchGetRating.fulfilled]: (state, action) => {
            state.rating.status = 'loaded'
            state.rating.data = action.payload
        },
        [fetchGetRating.rejected]: (state) => {
            state.rating.status = 'error'
            state.rating.data = null
        },

        [fetchGetAllRatings.pending]: (state) => {
            state.rating.status = 'loading'
            state.rating.items = []
        },
        [fetchGetAllRatings.fulfilled]: (state, action) => {
            state.rating.status = 'loaded'
            state.rating.items = action.payload
        },
        [fetchGetAllRatings.rejected]: (state) => {
            state.rating.status = 'error'
            state.rating.items = []
        },


        [fetchGetScore.pending]: (state) => {
            state.score.status = 'loading'
            state.score.data = null
        },
        [fetchGetScore.fulfilled]: (state, action) => {
            state.score.status = 'loaded'
            state.score.data = action.payload
        },
        [fetchGetScore.rejected]: (state) => {
            state.score.status = 'error'
            state.score.data = null
        },



        [fetchAuthMe.pending]: (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchAuthMe.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchAuthMe.rejected]: (state) => {
            state.status = 'error'
            state.data = null
        },


        [fetchLogin.pending]: (state) => {
            state.status = 'loading'
            state.error = ''
        },
        [fetchLogin.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchLogin.rejected]: (state, action) => {
            state.status = 'error'
            state.error = action.payload
        },


        [fetchRegister.pending]: (state) => {
            state.status = 'loading'
            state.error = ''
        },

        [fetchRegister.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },

        [fetchRegister.rejected]: (state, action) => {
            state.status = 'error'
            state.error = action.payload
        },

        [fetchUpdate.pending]: (state) => {
            state.status = 'loading'
            state.error = ''
        },
        [fetchUpdate.fulfilled]: (state, action) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchUpdate.rejected]: (state, action) => {
            state.status = 'error'
            state.error = action.payload
        },

    }
})

export const selectIsAuth = (state) => Boolean(state.user.data)

export const userReducer = userSlice.reducer

export const { logout } = userSlice.actions