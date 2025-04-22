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
      <Card className="shadow-sm mb-4">
        <Card.Body>
          {error && (
            <Alert variant="danger" className="mb-4">
              {error}
            </Alert>
          )}
          {loading && (
            <div className="text-center mb-4">
              <Spinner animation="border" variant="primary" />
            </div>
          )}

          <Form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(initialValues);
            }}
          >
            <Form.Group controlId="title" className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={initialValues.title || ""}
                onChange={onChange}
                disabled={loading}
                placeholder="Enter menu title"
              />
            </Form.Group>

            <Form.Group controlId="type" className="mb-3">
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

            <Form.Group controlId="status" className="mb-3">
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

            <Form.Group controlId="templateId" className="mb-4">
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

            <div className="d-flex justify-content-between">
              <Button
                variant="secondary"
                onClick={onCancel}
                disabled={loading}
                className="px-4"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={loading}
                className="px-4"
              >
                {isEditMode ? "Update" : "Create"}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </MainLayout>
  );
};

export default MenuForm;
