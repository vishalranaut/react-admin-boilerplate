import { takeLatest, call, put, select } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import authService, { 
  LoginCredentials, 
  User, 
  ChangePasswordData 
} from '../../services/authService';
import { 
  loginRequest, 
  loginSuccess, 
  loginFailure, 
  updateProfileRequest, 
  updateProfileSuccess, 
  updateProfileFailure, 
  changePasswordRequest, 
  changePasswordSuccess, 
  changePasswordFailure 
} from '../reducers/authSlice';
import { RootState } from '../index';

// Worker sagas
function* loginSaga(action: PayloadAction<LoginCredentials>) {
  try {
    const user: User = yield call(authService.login, action.payload);
    yield put(loginSuccess(user));
  } catch (error) {
    yield put(loginFailure(error instanceof Error ? error.message : 'Login failed'));
  }
}

function* updateProfileSaga(action: PayloadAction<Partial<User>>) {
  try {
    const userId: number = yield select((state: RootState) => state.auth.user?.id);
    if (!userId) {
      throw new Error('User not found');
    }
    
    const updatedUser: User = yield call(
      authService.updateProfile, 
      userId, 
      action.payload
    );
    
    yield put(updateProfileSuccess(updatedUser));
  } catch (error) {
    yield put(updateProfileFailure(error instanceof Error ? error.message : 'Update profile failed'));
  }
}

function* changePasswordSaga(action: PayloadAction<ChangePasswordData>) {
  try {
    const userId: number = yield select((state: RootState) => state.auth.user?.id);
    if (!userId) {
      throw new Error('User not found');
    }
    
    yield call(
      authService.changePassword,
      userId,
      action.payload
    );
    
    yield put(changePasswordSuccess());
  } catch (error) {
    yield put(changePasswordFailure(error instanceof Error ? error.message : 'Change password failed'));
  }
}

// Watcher sagas
export default function* authSaga() {
  yield takeLatest(loginRequest.type, loginSaga);
  yield takeLatest(updateProfileRequest.type, updateProfileSaga);
  yield takeLatest(changePasswordRequest.type, changePasswordSaga);
}