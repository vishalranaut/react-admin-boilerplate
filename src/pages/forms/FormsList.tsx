import React from "react";
import MainLayout from "../../layout/MainLayout";
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

interface FormData {
  id: number;
  name: string;
  email: string;
  message: string;
}

interface FormsListProps {
  forms: FormData[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  showDeleteModal: boolean;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteClick: (formId: number) => void;
  onDeleteConfirm: () => void;
  onCloseDeleteModal: () => void;
  onAddForm: () => void;
}

const FormsList: React.FC<FormsListProps> = ({
  forms,
  loading,
  error,
  searchTerm,
  showDeleteModal,
  onSearchChange,
  onDeleteClick,
  onDeleteConfirm,
  onCloseDeleteModal,
  onAddForm,
}) => {
  const filteredForms = forms.filter(
    (form) =>
      form.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      form.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      form.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout title="Forms Management">
      <div className="page-fade-in">
        <Row className="mb-4 align-items-center">
          <Col md={6}>
            <InputGroup>
              <InputGroup.Text>🔍</InputGroup.Text>
              <Form.Control
                placeholder="Search forms..."
                value={searchTerm}
                onChange={onSearchChange}
              />
            </InputGroup>
          </Col>
          <Col md={6} className="text-end">
            <Button variant="primary" onClick={onAddForm}>
              + Add Form
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
            ) : filteredForms.length > 0 ? (
              <ListGroup>
                {filteredForms.map((form) => (
                  <ListGroup.Item key={form.id}>
                    <Row>
                      <Col>
                        <strong>Name:</strong> {form.name} <br />
                        <strong>Email:</strong> {form.email} <br />
                        <strong>Message:</strong> {form.message}
                      </Col>
                      <Col md="auto" className="text-end">
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => onDeleteClick(form.id)}
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
                  ? "No forms found matching your search."
                  : "No forms found."}
              </Alert>
            )}
          </Card.Body>
        </Card>

        <Modal show={showDeleteModal} onHide={onCloseDeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this form?</Modal.Body>
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

export default FormsList;
