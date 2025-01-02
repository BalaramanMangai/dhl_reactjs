import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    username: '',
    password: '',
    isAuthenticated: false,
    userInfo: null,
    roleId: 0,
    error: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.userInfo = action.payload;
      state.roleId = action.payload.role_id;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.userInfo = null;
      state.roleId = 0;
      state.error = action.payload;
    },
    logout: (state) => {
      state.username = '';
      state.password = '';
      state.isAuthenticated = false;
      state.userInfo = null;
      state.roleId = 0;
      state.error = null;
    },
  },
});

export const { setCredentials, loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;
