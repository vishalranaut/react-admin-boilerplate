import React from "react";
import MainLayout from "../../layout/MainLayout";
import { Template } from "../../services/pageService";
import {
  Card,
  Button,
  Spinner,
  Form,
  InputGroup,
  Row,
  Col,
  Modal,
  ListGroup,
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
    <MainLayout title="Templates Management">
      <div className="page-fade-in">
        <Row className="mb-4 align-items-center">
          <Col md={6}>
            <InputGroup>
              <InputGroup.Text>🔍</InputGroup.Text>
              <Form.Control
                placeholder="Search templates..."
                value={searchTerm}
                onChange={onSearchChange}
              />
            </InputGroup>
          </Col>
          <Col md={6} className="text-end">
            <Button variant="primary" onClick={onAddTemplate}>
              + Add Template
            </Button>
          </Col>
        </Row>

        <Card className="border-0 shadow-sm">
          <Card.Body>
            {error && <Alert variant="danger">{error}</Alert>}

            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" />
              </div>
            ) : filteredTemplates.length > 0 ? (
              <ListGroup>
                {filteredTemplates.map((template) => (
                  <ListGroup.Item key={template.id}>
                    <Row>
                      <Col>
                        <strong>Title:</strong> {template.title} <br />
                        <strong>Slug:</strong> {template.slug} <br />
                        <strong>Type:</strong> {template.type}
                      </Col>
                      <Col md="auto" className="text-end">
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => onDeleteClick(template.id)}
                        >
                          Delete
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <Alert variant="info">
                {searchTerm
                  ? "No templates found matching your search."
                  : "No templates found."}
              </Alert>
            )}
          </Card.Body>
        </Card>

        <Modal show={showDeleteModal} onHide={onCloseDeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this template?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onCloseDeleteModal}>
              Cancel
            </Button>
            <Button variant="danger" onClick={onDeleteConfirm}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </MainLayout>
  );
};

export default TemplatesList;
