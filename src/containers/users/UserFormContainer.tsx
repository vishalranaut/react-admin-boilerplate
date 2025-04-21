import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import UserForm from '../../pages/users/UserForm';

interface UserFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  role: string;
  avatar: string;
}

const UserFormContainer = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  
  const [initialValues, setInitialValues] = useState<UserFormValues>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    role: 'editor',
    avatar: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchUser = async () => {
      if (!isEditMode) return;
      
      try {
        setLoading(true);
        const response = await api.get(`/users/${id}`);
        const userData = response.data;
        
        setInitialValues({
          username: userData.username || '',
          email: userData.email || '',
          password: '',
          confirmPassword: '',
          name: userData.name || '',
          role: userData.role || 'editor',
          avatar: userData.avatar || '',
        });
      } catch (err) {
        setError('Failed to load user data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
  }, [id, isEditMode]);
  
  const handleSubmit = async (values: UserFormValues) => {
    const { confirmPassword, ...userData } = values;
    
    try {
      setLoading(true);
      setError(null);
      
      if (isEditMode) {
        if (!userData.password) {
          const { password, ...userDataWithoutPassword } = userData;
          await api.patch(`/users/${id}`, userDataWithoutPassword);
        } else {
          await api.patch(`/users/${id}`, userData);
        }
      } else {
        await api.post('/users', userData);
      }
      
      navigate('/users');
    } catch (err) {
      setError(`Failed to ${isEditMode ? 'update' : 'create'} user`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserForm
      isEditMode={isEditMode}
      initialValues={initialValues}
      loading={loading}
      error={error}
      onSubmit={handleSubmit}
      onCancel={() => navigate('/users')}
    />
  );
};

export default UserFormContainer;