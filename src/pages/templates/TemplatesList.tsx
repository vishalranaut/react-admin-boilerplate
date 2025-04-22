import React from "react";
import MainLayout from "../../layout/MainLayout";
import { Template } from "../../services/pageService";
import {
  Card,
  Button,
  Spinner,
  Form,
  InputGroup,
  Modal,
  Table,
  Alert,
} from "react-bootstrap";

interface TemplatesListProps {
  templates: Template[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  showDeleteModal: boolean;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteClick: (id: number) => void;
  onDeleteConfirm: () => void;
  onCloseDeleteModal: () => void;
  onAddTemplate: () => void;
}

const TemplatesList: React.FC<TemplatesListProps> = ({
  templates,
  loading,
  error,
  searchTerm,
  showDeleteModal,
  onSearchChange,
  onDeleteClick,
  onDeleteConfirm,
  onCloseDeleteModal,
  onAddTemplate,
}) => {
  const filteredTemplates = templates.filter(
    (template) =>
      template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout title="Templates">
      <div className="page-fade-in">
        <div className="d-flex justify-content-end mb-4">
          <Button variant="primary" onClick={onAddTemplate} className="me-3">
            + Add Template
          </Button>
        </div>

        <InputGroup className="mb-4">
          <InputGroup.Text>🔍</InputGroup.Text>
          <Form.Control
            placeholder="Search by title, slug, or type..."
            value={searchTerm}
            onChange={onSearchChange}
          />
        </InputGroup>

        {error && <Alert variant="danger">{error}</Alert>}

        <Card className="border-0 shadow-sm">
          <Card.Body>
            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" />
              </div>
            ) : filteredTemplates.length > 0 ? (
              <div className="table-responsive">
                <Table hover responsive className="align-middle">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Slug</th>
                      <th>Type</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTemplates.map((template) => (
                      <tr key={template.id}>
                        <td>{template.title}</td>
                        <td>{template.slug}</td>
                        <td>{template.type}</td>
                        <td className="text-end">
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => onDeleteClick(template.id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            ) : (
              <Alert variant="info">
                {searchTerm
                  ? "No templates found matching your search."
                  : "No templates found."}
              </Alert>
            )}
          </Card.Body>
        </Card>

        <Modal show={showDeleteModal} onHide={onCloseDeleteModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Delete Template</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this template? This action cannot be
            undone.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onCloseDeleteModal}>
              Cancel
            </Button>
            <Button variant="danger" onClick={onDeleteConfirm}>
              Confirm Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </MainLayout>
  );
};

export default TemplatesList;
