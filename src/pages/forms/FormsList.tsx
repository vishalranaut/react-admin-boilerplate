import React from "react";
import {
  Card,
  Button,
  Spinner,
  Form,
  InputGroup,
  Row,
  Col,
  Badge,
  Modal,
} from "react-bootstrap";
import MainLayout from "../../layout/MainLayout";

interface FormData {
  id: number;
  name: string;
  email: string;
  status: string;
  message: string;
}

interface FormsListProps {
  forms: FormData[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  showDeleteModal: boolean;
  formToDelete: FormData | null;
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
  formToDelete,
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
      form.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      form.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout title="Forms Management">
      <div className="page-fade-in">
        <Row className="mb-4">
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
          <Col md={6} className="text-md-end mt-3 mt-md-0">
            <Button variant="primary" onClick={onAddForm}>
              + Add New Form
            </Button>
          </Col>
        </Row>

        <Card className="border-0 shadow-sm">
          <Card.Body>
            {error && <p className="text-danger">{error}</p>}

            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" role="status" />
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th>Form Details</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredForms.map((form) => (
                      <tr key={form.id}>
                        <td>
                          <div className="d-flex flex-column">
                            <span className="fw-bold">{form.name}</span>
                            <small className="text-muted">{form.email}</small>
                            <small className="text-muted">{form.message}</small>
                          </div>
                        </td>
                        <td>
                          <Badge bg="success" className="px-3 py-2">
                            {form.status}
                          </Badge>
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => onDeleteClick(form.id)}
                              className="d-flex align-items-center"
                            >
                              <i className="bi bi-trash me-1"></i>
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {filteredForms.length === 0 && (
                      <tr>
                        <td colSpan={3} className="text-center py-5">
                          <div className="d-flex flex-column align-items-center">
                            <i
                              className="bi bi-envelope-slash text-muted mb-3"
                              style={{ fontSize: "2rem" }}
                            ></i>
                            <p className="text-muted mb-0">
                              {searchTerm
                                ? "No forms found matching your search."
                                : "No forms found."}
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </Card.Body>
        </Card>

        <Modal show={showDeleteModal} onHide={onCloseDeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center mb-3">
              <i
                className="bi bi-exclamation-triangle text-danger mb-3"
                style={{ fontSize: "2rem" }}
              ></i>
              <p>Are you sure you want to delete this form?</p>
              <p className="fw-bold mb-0">{formToDelete?.name}</p>
              <small className="text-muted">
                This action cannot be undone.
              </small>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-secondary" onClick={onCloseDeleteModal}>
              Cancel
            </Button>
            <Button variant="danger" onClick={onDeleteConfirm}>
              Delete Form
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </MainLayout>
  );
};

export default FormsList;
