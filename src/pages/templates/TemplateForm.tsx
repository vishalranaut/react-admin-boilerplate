import React, { useState, useEffect } from "react";
import { Template } from "../../services/pageService";
import MainLayout from "../../layout/MainLayout";
import { Card, Form, Button, Alert, Spinner } from "react-bootstrap";

type TemplateFormData = Omit<Template, "id">;

interface TemplateFormProps {
  isEditMode: boolean;
  initialValues: Partial<TemplateFormData>;
  loading: boolean;
  error: string | null;
  onSubmit: (data: TemplateFormData) => void;
  onCancel: () => void;
}

const TemplateForm: React.FC<TemplateFormProps> = ({
  isEditMode,
  initialValues,
  loading,
  error,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<TemplateFormData>({
    title: "",
    slug: "",
    type: "static",
    htmlContent: "",
    bannerImage: "",
  });

  useEffect(() => {
    setFormData({
      title: initialValues.title || "",
      slug: initialValues.slug || "",
      type: initialValues.type || "static",
      htmlContent: initialValues.htmlContent || "",
      bannerImage: initialValues.bannerImage || "",
    });
  }, [initialValues]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <MainLayout title="Template Form">
      <Card>
        <Card.Body>
          <h2>{isEditMode ? "Edit Template" : "Create Template"}</h2>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="slug">
              <Form.Label>Slug</Form.Label>
              <Form.Control
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="type">
              <Form.Label>Type</Form.Label>
              <Form.Control
                as="select"
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="static">Static</option>
                <option value="dynamic">Dynamic</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="htmlContent">
              <Form.Label>HTML Content</Form.Label>
              <Form.Control
                as="textarea"
                name="htmlContent"
                value={formData.htmlContent}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="bannerImage">
              <Form.Label>Banner Image URL</Form.Label>
              <Form.Control
                type="text"
                name="bannerImage"
                value={formData.bannerImage}
                onChange={handleChange}
              />
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}

            {loading && <Spinner animation="border" variant="primary" />}

            <Button
              variant="secondary"
              onClick={onCancel}
              style={{ marginRight: "10px" }}
            >
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {isEditMode ? "Update" : "Create"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </MainLayout>
  );
};

export default TemplateForm;
