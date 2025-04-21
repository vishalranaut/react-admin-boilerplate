import { useState, useEffect } from 'react';
import { Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import MainLayout from '../../layout/MainLayout';
import api from '../../services/api';

interface UserFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  role: string;
  avatar: string;
}

const UserForm = () => {
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
  
  const validationSchema = Yup.object({
    username: Yup.string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .when('$isEditMode', {
        is: false,
        then: schema => schema.required('Password is required'),
      }),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .when('password', {
        is: (val: string) => val && val.length > 0,
        then: schema => schema.required('Please confirm your password'),
      }),
    name: Yup.string()
      .required('Name is required'),
    role: Yup.string()
      .required('Role is required'),
  });
  
  const handleSubmit = async (values: UserFormValues) => {
    const { confirmPassword, ...userData } = values;
    
    try {
      setLoading(true);
      setError(null);
      
      if (isEditMode) {
        // If password is empty in edit mode, don't send it
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
    <MainLayout title={isEditMode ? 'Edit User' : 'Add New User'}>
      <div className="page-fade-in">
        <Card className="border-0 shadow-sm">
          <Card.Body>
            {loading && !isEditMode ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <>
                {error && <Alert variant="danger">{error}</Alert>}
                
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                  enableReinitialize
                  validateOnChange={false}
                  validateOnBlur={true}
                  context={{ isEditMode }}
                >
                  {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    errors,
                  }) => (
                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                              type="text"
                              name="username"
                              value={values.username}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={touched.username && !!errors.username}
                              placeholder="Enter username"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.username}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              type="email"
                              name="email"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={touched.email && !!errors.email}
                              placeholder="Enter email"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.email}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>
                              {isEditMode ? 'New Password (leave blank to keep current)' : 'Password'}
                            </Form.Label>
                            <Form.Control
                              type="password"
                              name="password"
                              value={values.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={touched.password && !!errors.password}
                              placeholder={isEditMode ? 'Enter new password' : 'Enter password'}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.password}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                              type="password"
                              name="confirmPassword"
                              value={values.confirmPassword}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                              placeholder="Confirm password"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.confirmPassword}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="name"
                              value={values.name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={touched.name && !!errors.name}
                              placeholder="Enter full name"
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.name}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                        
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Select
                              name="role"
                              value={values.role}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={touched.role && !!errors.role}
                            >
                              <option value="admin">Admin</option>
                              <option value="editor">Editor</option>
                              <option value="viewer">Viewer</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              {errors.role}
                            </Form.Control.Feedback>
                          </Form.Group>
                        </Col>
                      </Row>
                      
                      <Form.Group className="mb-3">
                        <Form.Label>Avatar URL</Form.Label>
                        <Form.Control
                          type="text"
                          name="avatar"
                          value={values.avatar}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          placeholder="Enter avatar URL (optional)"
                        />
                        <Form.Text className="text-muted">
                          Leave blank to use the default avatar
                        </Form.Text>
                      </Form.Group>
                      
                      <div className="d-flex gap-2">
                        <Button
                          variant="primary"
                          type="submit"
                          disabled={loading}
                        >
                          {loading ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              {isEditMode ? 'Saving...' : 'Creating...'}
                            </>
                          ) : (
                            isEditMode ? 'Save Changes' : 'Create User'
                          )}
                        </Button>
                        
                        <Button
                          variant="outline-secondary"
                          onClick={() => navigate('/users')}
                        >
                          Cancel
                        </Button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </>
            )}
          </Card.Body>
        </Card>
      </div>
    </MainLayout>
  );
};

export default UserForm;