import React from "react";
import MainLayout from "../../layout/MainLayout";
import { Card, Button, Form, Spinner, Alert } from "react-bootstrap";
import {
  FormData,
  FormField,
} from "../../containers/forms/FormBuilderContainer";

interface Props {
  isEditMode: boolean;
  loading: boolean;
  error: string | null;
  formData: FormData;
  onChange: (
    e: React.ChangeEvent<any>,
    fieldId: string,
    fieldType: string
  ) => void;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const FormBuilder: React.FC<Props> = ({
  isEditMode,
  loading,
  error,
  formData,
  onChange,
  onNameChange,
  onSubmit,
  onCancel,
}) => {
  const renderField = (field: FormField) => {
    const commonProps = {
      name: field.id,
      value: field.value || "",
      required: field.required,
      onChange: (e: React.ChangeEvent<any>) =>
        onChange(e, field.id, field.type),
    };

    switch (field.type) {
      case "text":
      case "email":
        return <Form.Control type={field.type} {...commonProps} />;
      case "textarea":
        return <Form.Control as="textarea" {...commonProps} />;
      case "select":
        return (
          <Form.Control as="select" {...commonProps}>
            <option value="">Select...</option>
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Form.Control>
        );
      default:
        return null;
    }
  };

  return (
    <MainLayout title="Form Builder">
      <Card>
        <Card.Body>
          <form onSubmit={onSubmit}>
            <h2>{isEditMode ? "Edit" : "Create"} Form</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {loading ? (
              <Spinner animation="border" />
            ) : (
              <>
                <Form.Group>
                  <Form.Control
                    type="text"
                    value={formData.name}
                    onChange={onNameChange}
                    required
                  />
                </Form.Group>

                {formData.fields.map((field) => (
                  <Form.Group key={field.id} controlId={field.id}>
                    <Form.Label>{field.label}</Form.Label>
                    {renderField(field)}
                  </Form.Group>
                ))}

                <div className="d-flex justify-content-between mt-3">
                  <Button type="submit" variant="primary">
                    {isEditMode ? "Update" : "Create"}
                  </Button>
                  <Button variant="secondary" onClick={onCancel}>
                    Cancel
                  </Button>
                </div>
              </>
            )}
          </form>
        </Card.Body>
      </Card>
    </MainLayout>
  );
};

export default FormBuilder;
