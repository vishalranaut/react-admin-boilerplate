import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { updateProfileRequest } from '../store/reducers/authSlice';
import Profile from '../pages/Profile';

const ProfileContainer = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state: RootState) => state.auth);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    avatar: ''
  });
  
  const [success, setSuccess] = useState(false);
  
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        avatar: user.avatar || ''
      });
    }
  }, [user]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateProfileRequest(formData));
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };
  
  return (
    <Profile
      user={user}
      formData={formData}
      loading={loading}
      error={error}
      success={success}
      onInputChange={handleInputChange}
      onSubmit={handleSubmit}
    />
  );
};

export default ProfileContainer;