import { takeLatest, call, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { templateService, menuService, Template, Menu } from '../../services/pageService';
import {
  fetchTemplatesRequest,
  fetchTemplatesSuccess,
  fetchTemplatesFailure,
  fetchTemplateByIdRequest,
  fetchTemplateByIdSuccess,
  fetchTemplateByIdFailure,
  createTemplateRequest,
  createTemplateSuccess,
  createTemplateFailure,
  updateTemplateRequest,
  updateTemplateSuccess,
  updateTemplateFailure,
  deleteTemplateRequest,
  deleteTemplateSuccess,
  deleteTemplateFailure,
  fetchMenusRequest,
  fetchMenusSuccess,
  fetchMenusFailure,
  fetchMenuByIdRequest,
  fetchMenuByIdSuccess,
  fetchMenuByIdFailure,
  createMenuRequest,
  createMenuSuccess,
  createMenuFailure,
  updateMenuRequest,
  updateMenuSuccess,
  updateMenuFailure,
  deleteMenuRequest,
  deleteMenuSuccess,
  deleteMenuFailure,
} from '../reducers/pageSlice';

// Template Sagas
function* fetchTemplatesSaga() {
  try {
    const templates: Template[] = yield call(templateService.getAllTemplates);
    yield put(fetchTemplatesSuccess(templates));
  } catch (error) {
    yield put(fetchTemplatesFailure(error instanceof Error ? error.message : 'Failed to fetch templates'));
  }
}

function* fetchTemplateByIdSaga(action: PayloadAction<number>) {
  try {
    const template: Template = yield call(templateService.getTemplateById, action.payload);
    yield put(fetchTemplateByIdSuccess(template));
  } catch (error) {
    yield put(fetchTemplateByIdFailure(error instanceof Error ? error.message : 'Failed to fetch template'));
  }
}

function* createTemplateSaga(action: PayloadAction<Omit<Template, 'id'>>) {
  try {
    const template: Template = yield call(templateService.createTemplate, action.payload);
    yield put(createTemplateSuccess(template));
  } catch (error) {
    yield put(createTemplateFailure(error instanceof Error ? error.message : 'Failed to create template'));
  }
}

function* updateTemplateSaga(action: PayloadAction<{ id: number; data: Partial<Template> }>) {
  try {
    const { id, data } = action.payload;
    const template: Template = yield call(templateService.updateTemplate, id, data);
    yield put(updateTemplateSuccess(template));
  } catch (error) {
    yield put(updateTemplateFailure(error instanceof Error ? error.message : 'Failed to update template'));
  }
}

function* deleteTemplateSaga(action: PayloadAction<number>) {
  try {
    yield call(templateService.deleteTemplate, action.payload);
    yield put(deleteTemplateSuccess(action.payload));
  } catch (error) {
    yield put(deleteTemplateFailure(error instanceof Error ? error.message : 'Failed to delete template'));
  }
}

// Menu Sagas
function* fetchMenusSaga() {
  try {
    const menus: Menu[] = yield call(menuService.getAllMenus);
    yield put(fetchMenusSuccess(menus));
  } catch (error) {
    yield put(fetchMenusFailure(error instanceof Error ? error.message : 'Failed to fetch menus'));
  }
}

function* fetchMenuByIdSaga(action: PayloadAction<number>) {
  try {
    const menu: Menu = yield call(menuService.getMenuById, action.payload);
    yield put(fetchMenuByIdSuccess(menu));
  } catch (error) {
    yield put(fetchMenuByIdFailure(error instanceof Error ? error.message : 'Failed to fetch menu'));
  }
}

function* createMenuSaga(action: PayloadAction<Omit<Menu, 'id'>>) {
  try {
    const menu: Menu = yield call(menuService.createMenu, action.payload);
    yield put(createMenuSuccess(menu));
  } catch (error) {
    yield put(createMenuFailure(error instanceof Error ? error.message : 'Failed to create menu'));
  }
}

function* updateMenuSaga(action: PayloadAction<{ id: number; data: Partial<Menu> }>) {
  try {
    const { id, data } = action.payload;
    const menu: Menu = yield call(menuService.updateMenu, id, data);
    yield put(updateMenuSuccess(menu));
  } catch (error) {
    yield put(updateMenuFailure(error instanceof Error ? error.message : 'Failed to update menu'));
  }
}

function* deleteMenuSaga(action: PayloadAction<number>) {
  try {
    yield call(menuService.deleteMenu, action.payload);
    yield put(deleteMenuSuccess(action.payload));
  } catch (error) {
    yield put(deleteMenuFailure(error instanceof Error ? error.message : 'Failed to delete menu'));
  }
}

// Watcher saga
export default function* pageSaga() {
  // Templates
  yield takeLatest(fetchTemplatesRequest.type, fetchTemplatesSaga);
  yield takeLatest(fetchTemplateByIdRequest.type, fetchTemplateByIdSaga);
  yield takeLatest(createTemplateRequest.type, createTemplateSaga);
  yield takeLatest(updateTemplateRequest.type, updateTemplateSaga);
  yield takeLatest(deleteTemplateRequest.type, deleteTemplateSaga);
  
  // Menus
  yield takeLatest(fetchMenusRequest.type, fetchMenusSaga);
  yield takeLatest(fetchMenuByIdRequest.type, fetchMenuByIdSaga);
  yield takeLatest(createMenuRequest.type, createMenuSaga);
  yield takeLatest(updateMenuRequest.type, updateMenuSaga);
  yield takeLatest(deleteMenuRequest.type, deleteMenuSaga);
}