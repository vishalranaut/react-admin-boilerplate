import api from './api';

// Types
export interface Template {
  id: number;
  title: string;
  slug: string;
  type: 'static' | 'dynamic';
  htmlContent?: string;
  bannerImage?: string;
}

export interface Menu {
  id: number;
  title: string;
  type: 'list' | 'single';
  status: 'active' | 'inactive';
  templateId: number;
}

// Template services
export const templateService = {
  // Get all templates
  getAllTemplates: async (): Promise<Template[]> => {
    const response = await api.get('/templates');
    return response.data;
  },
  
  // Get template by id
  getTemplateById: async (id: number): Promise<Template> => {
    const response = await api.get(`/templates/${id}`);
    return response.data;
  },
  
  // Create new template
  createTemplate: async (template: Omit<Template, 'id'>): Promise<Template> => {
    const response = await api.post('/templates', template);
    return response.data;
  },
  
  // Update template
  updateTemplate: async (id: number, template: Partial<Template>): Promise<Template> => {
    const response = await api.patch(`/templates/${id}`, template);
    return response.data;
  },
  
  // Delete template
  deleteTemplate: async (id: number): Promise<void> => {
    await api.delete(`/templates/${id}`);
  }
};

// Menu services
export const menuService = {
  // Get all menus
  getAllMenus: async (): Promise<Menu[]> => {
    const response = await api.get('/menus');
    return response.data;
  },
  
  // Get menu by id
  getMenuById: async (id: number): Promise<Menu> => {
    const response = await api.get(`/menus/${id}`);
    return response.data;
  },
  
  // Create new menu
  createMenu: async (menu: Omit<Menu, 'id'>): Promise<Menu> => {
    const response = await api.post('/menus', menu);
    return response.data;
  },
  
  // Update menu
  updateMenu: async (id: number, menu: Partial<Menu>): Promise<Menu> => {
    const response = await api.patch(`/menus/${id}`, menu);
    return response.data;
  },
  
  // Delete menu
  deleteMenu: async (id: number): Promise<void> => {
    await api.delete(`/menus/${id}`);
  }
};