import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import authService, { User, LoginCredentials, ChangePasswordData } from '../../services/authService';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  error: string | null;
  loading: boolean;
  initialized: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  error: null,
  loading: false,
  initialized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Login
    loginRequest: (state, action: PayloadAction<LoginCredentials>) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = action.payload;
    },
    
    // Logout
    logout: (state) => {
      authService.logout();
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
    
    // Check authentication status
    checkAuth: (state) => {
      const token = localStorage.getItem('authToken');
      const user = authService.getCurrentUser();
      
      if (token && user) {
        state.isAuthenticated = true;
        state.user = user;
      }
      
      state.initialized = true;
    },
    
    // Update profile
    updateProfileRequest: (state, action: PayloadAction<Partial<User>>) => {
      state.loading = true;
      state.error = null;
    },
    updateProfileSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateProfileFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Change password
    changePasswordRequest: (state, action: PayloadAction<ChangePasswordData>) => {
      state.loading = true;
      state.error = null;
    },
    changePasswordSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    changePasswordFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Clear errors
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  checkAuth,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailure,
  changePasswordRequest,
  changePasswordSuccess,
  changePasswordFailure,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;