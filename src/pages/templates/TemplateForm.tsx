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
    <MainLayout title="Add Template Form">
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

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="title" className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter template title"
              />
            </Form.Group>

            <Form.Group controlId="slug" className="mb-3">
              <Form.Label>Slug</Form.Label>
              <Form.Control
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="Enter template slug"
              />
            </Form.Group>

            <Form.Group controlId="type" className="mb-3">
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

            <Form.Group controlId="htmlContent" className="mb-3">
              <Form.Label>HTML Content</Form.Label>
              <Form.Control
                as="textarea"
                name="htmlContent"
                value={formData.htmlContent}
                onChange={handleChange}
                rows={6}
                placeholder="Enter HTML content"
              />
            </Form.Group>

            <Form.Group controlId="bannerImage" className="mb-4">
              <Form.Label>Banner Image URL</Form.Label>
              <Form.Control
                type="text"
                name="bannerImage"
                value={formData.bannerImage}
                onChange={handleChange}
                placeholder="Enter banner image URL"
              />
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

export default TemplateForm;
