import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Template, Menu } from '../../services/pageService';

interface PageState {
  templates: {
    items: Template[];
    selected: Template | null;
    loading: boolean;
    error: string | null;
  };
  menus: {
    items: Menu[];
    selected: Menu | null;
    loading: boolean;
    error: string | null;
  };
}

const initialState: PageState = {
  templates: {
    items: [],
    selected: null,
    loading: false,
    error: null,
  },
  menus: {
    items: [],
    selected: null,
    loading: false,
    error: null,
  },
};

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    // Templates
    fetchTemplatesRequest: (state) => {
      state.templates.loading = true;
      state.templates.error = null;
    },
    fetchTemplatesSuccess: (state, action: PayloadAction<Template[]>) => {
      state.templates.items = action.payload;
      state.templates.loading = false;
      state.templates.error = null;
    },
    fetchTemplatesFailure: (state, action: PayloadAction<string>) => {
      state.templates.loading = false;
      state.templates.error = action.payload;
    },
    
    fetchTemplateByIdRequest: (state, action: PayloadAction<number>) => {
      state.templates.loading = true;
      state.templates.error = null;
    },
    fetchTemplateByIdSuccess: (state, action: PayloadAction<Template>) => {
      state.templates.selected = action.payload;
      state.templates.loading = false;
      state.templates.error = null;
    },
    fetchTemplateByIdFailure: (state, action: PayloadAction<string>) => {
      state.templates.loading = false;
      state.templates.error = action.payload;
    },
    
    createTemplateRequest: (state, action: PayloadAction<Omit<Template, 'id'>>) => {
      state.templates.loading = true;
      state.templates.error = null;
    },
    createTemplateSuccess: (state, action: PayloadAction<Template>) => {
      state.templates.items.push(action.payload);
      state.templates.loading = false;
      state.templates.error = null;
    },
    createTemplateFailure: (state, action: PayloadAction<string>) => {
      state.templates.loading = false;
      state.templates.error = action.payload;
    },
    
    updateTemplateRequest: (state, action: PayloadAction<{ id: number; data: Partial<Template> }>) => {
      state.templates.loading = true;
      state.templates.error = null;
    },
    updateTemplateSuccess: (state, action: PayloadAction<Template>) => {
      const index = state.templates.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.templates.items[index] = action.payload;
      }
      state.templates.loading = false;
      state.templates.error = null;
    },
    updateTemplateFailure: (state, action: PayloadAction<string>) => {
      state.templates.loading = false;
      state.templates.error = action.payload;
    },
    
    deleteTemplateRequest: (state, action: PayloadAction<number>) => {
      state.templates.loading = true;
      state.templates.error = null;
    },
    deleteTemplateSuccess: (state, action: PayloadAction<number>) => {
      state.templates.items = state.templates.items.filter(item => item.id !== action.payload);
      state.templates.loading = false;
      state.templates.error = null;
    },
    deleteTemplateFailure: (state, action: PayloadAction<string>) => {
      state.templates.loading = false;
      state.templates.error = action.payload;
    },
    
    // Menus
    fetchMenusRequest: (state) => {
      state.menus.loading = true;
      state.menus.error = null;
    },
    fetchMenusSuccess: (state, action: PayloadAction<Menu[]>) => {
      state.menus.items = action.payload;
      state.menus.loading = false;
      state.menus.error = null;
    },
    fetchMenusFailure: (state, action: PayloadAction<string>) => {
      state.menus.loading = false;
      state.menus.error = action.payload;
    },
    
    fetchMenuByIdRequest: (state, action: PayloadAction<number>) => {
      state.menus.loading = true;
      state.menus.error = null;
    },
    fetchMenuByIdSuccess: (state, action: PayloadAction<Menu>) => {
      state.menus.selected = action.payload;
      state.menus.loading = false;
      state.menus.error = null;
    },
    fetchMenuByIdFailure: (state, action: PayloadAction<string>) => {
      state.menus.loading = false;
      state.menus.error = action.payload;
    },
    
    createMenuRequest: (state, action: PayloadAction<Omit<Menu, 'id'>>) => {
      state.menus.loading = true;
      state.menus.error = null;
    },
    createMenuSuccess: (state, action: PayloadAction<Menu>) => {
      state.menus.items.push(action.payload);
      state.menus.loading = false;
      state.menus.error = null;
    },
    createMenuFailure: (state, action: PayloadAction<string>) => {
      state.menus.loading = false;
      state.menus.error = action.payload;
    },
    
    updateMenuRequest: (state, action: PayloadAction<{ id: number; data: Partial<Menu> }>) => {
      state.menus.loading = true;
      state.menus.error = null;
    },
    updateMenuSuccess: (state, action: PayloadAction<Menu>) => {
      const index = state.menus.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.menus.items[index] = action.payload;
      }
      state.menus.loading = false;
      state.menus.error = null;
    },
    updateMenuFailure: (state, action: PayloadAction<string>) => {
      state.menus.loading = false;
      state.menus.error = action.payload;
    },
    
    deleteMenuRequest: (state, action: PayloadAction<number>) => {
      state.menus.loading = true;
      state.menus.error = null;
    },
    deleteMenuSuccess: (state, action: PayloadAction<number>) => {
      state.menus.items = state.menus.items.filter(item => item.id !== action.payload);
      state.menus.loading = false;
      state.menus.error = null;
    },
    deleteMenuFailure: (state, action: PayloadAction<string>) => {
      state.menus.loading = false;
      state.menus.error = action.payload;
    },
    
    // Clear selected items
    clearSelectedTemplate: (state) => {
      state.templates.selected = null;
    },
    clearSelectedMenu: (state) => {
      state.menus.selected = null;
    },
  },
});

export const {
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
  clearSelectedTemplate,
  clearSelectedMenu,
} = pageSlice.actions;

export default pageSlice.reducer;