import api from './api';

// Types
export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  name: string;
  avatar?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Auth Services
const authService = {
  // Login function
  login: async (credentials: LoginCredentials): Promise<User> => {
    try {
      // In a real app, this would be a POST request
      // For our mock API, we'll simulate auth by fetching users and matching credentials
      const response = await api.get('/users');
      const users = response.data;
      
      // Find user with matching credentials
      const user = users.find(
        (u: any) => 
          u.username === credentials.username && 
          u.password === credentials.password
      );
      
      if (!user) {
        throw new Error('Invalid credentials');
      }
      
      // Remove password from user object
      const { password, ...userWithoutPassword } = user;
      
      // In a real app, the server would generate a token
      // Here we'll just create a fake token
      const token = btoa(JSON.stringify({
        id: user.id,
        username: user.username,
        role: user.role
      }));
      
      // Store token and user in localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      return userWithoutPassword;
    } catch (error) {
      throw error;
    }
  },
  
  // Logout function
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },
  
  // Get current user
  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch (e) {
      return null;
    }
  },
  
  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('authToken');
  },
  
  // Update profile
  updateProfile: async (userId: number, userData: Partial<User>): Promise<User> => {
    const response = await api.patch(`/users/${userId}`, userData);
    
    // Update user in localStorage
    const currentUser = authService.getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      localStorage.setItem('user', JSON.stringify({
        ...currentUser,
        ...response.data
      }));
    }
    
    return response.data;
  },
  
  // Change password
  changePassword: async (userId: number, passwordData: ChangePasswordData): Promise<void> => {
    // First verify current password
    const response = await api.get(`/users/${userId}`);
    const user = response.data;
    
    if (user.password !== passwordData.currentPassword) {
      throw new Error('Current password is incorrect');
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      throw new Error('New passwords do not match');
    }
    
    // Update password
    await api.patch(`/users/${userId}`, {
      password: passwordData.newPassword
    });
  }
};

export default authService;