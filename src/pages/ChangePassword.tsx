import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Card, Form, Button, Alert } from "react-bootstrap";
import MainLayout from "../layout/MainLayout";

interface ChangePasswordProps {
  loading: boolean;
  error: string | null;
  success: boolean;
  onSubmit: (values: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => void;
  onCancel: () => void;
}

const validationSchema = Yup.object({
  currentPassword: Yup.string().required("Current password is required"),
  newPassword: Yup.string()
    .required("New password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Please confirm your password"),
});

const ChangePassword: React.FC<ChangePasswordProps> = ({
  loading,
  error,
  success,
  onSubmit,
  onCancel,
}) => {
  return (
    <MainLayout title="Change Password">
      <div className="page-fade-in">
        <Card className="border-0 shadow-sm">
          <Card.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && (
              <Alert variant="success">
                Password changed successfully! Redirecting...
              </Alert>
            )}

            <Formik
              initialValues={{
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
              }}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
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
                  <Form.Group className="mb-3">
                    <Form.Label>Current Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="currentPassword"
                      value={values.currentPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={
                        touched.currentPassword && !!errors.currentPassword
                      }
                      placeholder="Enter your current password"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.currentPassword}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="newPassword"
                      value={values.newPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.newPassword && !!errors.newPassword}
                      placeholder="Enter your new password"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.newPassword}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={
                        touched.confirmPassword && !!errors.confirmPassword
                      }
                      placeholder="Confirm your new password"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.confirmPassword}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div className="d-flex gap-2">
                    <Button variant="primary" type="submit" disabled={loading}>
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Changing Password...
                        </>
                      ) : (
                        "Change Password"
                      )}
                    </Button>
                    <Button
                      variant="outline-secondary"
                      onClick={onCancel}
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Card.Body>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ChangePassword;
