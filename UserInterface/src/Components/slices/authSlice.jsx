import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userdata, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:8080/user/login', userdata);
      if (response.status === 200 && response.data.token) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (error) {
      const message = error.response?.data || 'An error occurred. Please try again.';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (userdata, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:8080/user/signup', userdata);
      if (response.status === 200) {
        return response.data.user;
      } else {
        console.error('Signup failed:', response);
        return thunkAPI.rejectWithValue(response.data);
      }
    } catch (error) {
      console.error('Error in signupUser thunk:', error);
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
    error: null,
    loading: false, 
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('token');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.error = null;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
