import React from "react";
import { Menu } from "../../services/pageService";
import MainLayout from "../../layout/MainLayout";
import { Card, Form, Button, Alert, Spinner } from "react-bootstrap";

type FormElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

interface MenuFormProps {
  isEditMode: boolean;
  initialValues: Partial<Menu>;
  templates: { id: number; title: string }[];
  loading: boolean;
  error: string | null;
  onSubmit: (menu: Partial<Menu>) => void;
  onCancel: () => void;
  onChange: (e: React.ChangeEvent<FormElement>) => void;
}

const MenuForm: React.FC<MenuFormProps> = ({
  isEditMode,
  initialValues,
  templates,
  loading,
  error,
  onSubmit,
  onCancel,
  onChange,
}) => {
  return (
    <MainLayout title="Menu Form">
      <Card>
        <Card.Body>
          <h2>{isEditMode ? "Edit Menu" : "Create Menu"}</h2>

          {error && <Alert variant="danger">{error}</Alert>}
          {loading && <Spinner animation="border" variant="primary" />}

          <Form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(initialValues);
            }}
          >
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={initialValues.title || ""}
                onChange={onChange}
                disabled={loading}
              />
            </Form.Group>

            <Form.Group controlId="type">
              <Form.Label>Type</Form.Label>
              <Form.Control
                as="select"
                name="type"
                value={initialValues.type || "list"}
                onChange={onChange}
                disabled={loading}
              >
                <option value="list">List</option>
                <option value="grid">Grid</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={initialValues.status || "active"}
                onChange={onChange}
                disabled={loading}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="templateId">
              <Form.Label>Template</Form.Label>
              <Form.Control
                as="select"
                name="templateId"
                value={initialValues.templateId || ""}
                onChange={onChange}
                disabled={loading}
              >
                <option value="">Select Template</option>
                {templates.map((tpl) => (
                  <option key={tpl.id} value={tpl.id}>
                    {tpl.title}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Button
              variant="secondary"
              onClick={onCancel}
              style={{ marginRight: "10px" }}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {isEditMode ? "Update" : "Create"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </MainLayout>
  );
};

export default MenuForm;
