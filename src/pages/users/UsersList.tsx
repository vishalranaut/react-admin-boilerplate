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
import { Link } from "react-router-dom";
import MainLayout from "../../layout/MainLayout";
import { User } from "../../services/authService";

interface UsersListProps {
  users: User[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  showDeleteModal: boolean;
  userToDelete: User | null;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteClick: (userId: number) => void;
  onDeleteConfirm: () => void;
  onCloseDeleteModal: () => void;
}

const UsersList: React.FC<UsersListProps> = ({
  users,
  loading,
  error,
  searchTerm,
  showDeleteModal,
  userToDelete,
  onSearchChange,
  onDeleteClick,
  onDeleteConfirm,
  onCloseDeleteModal,
}) => {
  return (
    <MainLayout title="User Management">
      <div className="page-fade-in">
        <Row className="mb-4">
          <Col md={6}>
            <InputGroup>
              <InputGroup.Text>🔍</InputGroup.Text>
              <Form.Control
                placeholder="Search users..."
                value={searchTerm}
                onChange={onSearchChange}
              />
            </InputGroup>
          </Col>
          <Col md={6} className="text-md-end mt-3 mt-md-0">
            <Button as={Link as any} to="/users/add" variant="primary">
              Add New User
            </Button>
          </Col>
        </Row>

        <Card className="border-0 shadow-sm">
          <Card.Body>
            {error && <p className="text-danger">{error}</p>}

            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th style={{ width: "50px" }}></th>
                      <th>User Details</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>
                          <div
                            className="rounded-circle overflow-hidden"
                            style={{
                              width: "40px",
                              height: "40px",
                              border: "2px solid #e9ecef",
                            }}
                          >
                            <img
                              src={
                                user.avatar ||
                                "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300"
                              }
                              alt={user.name}
                              className="w-100 h-100 object-fit-cover"
                            />
                          </div>
                        </td>
                        <td>
                          <div className="d-flex flex-column">
                            <span className="fw-bold">{user.name}</span>
                            <small className="text-muted">
                              @{user.username}
                            </small>
                            <small className="text-muted">{user.email}</small>
                          </div>
                        </td>
                        <td>
                          <Badge
                            bg={
                              user.role === "admin"
                                ? "danger"
                                : user.role === "editor"
                                ? "primary"
                                : "secondary"
                            }
                            className="text-uppercase"
                          >
                            {user.role}
                          </Badge>
                        </td>
                        <td>
                          <Badge bg="success" className="px-3 py-2">
                            {user.status}
                          </Badge>
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <Button
                              as={Link as any}
                              to={`/users/edit/${user.id}`}
                              variant="outline-primary"
                              size="sm"
                              className="d-flex align-items-center"
                            >
                              <i className="bi bi-pencil me-1"></i>
                              Edit
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => onDeleteClick(user.id)}
                              className="d-flex align-items-center"
                            >
                              <i className="bi bi-trash me-1"></i>
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {users.length === 0 && (
                      <tr>
                        <td colSpan={5} className="text-center py-5">
                          <div className="d-flex flex-column align-items-center">
                            <i
                              className="bi bi-people text-muted mb-3"
                              style={{ fontSize: "2rem" }}
                            ></i>
                            <p className="text-muted mb-0">
                              {searchTerm
                                ? "No users found matching your search."
                                : "No users found."}
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
            <div className="text-center mb-4">
              <div
                className="rounded-circle overflow-hidden mx-auto mb-3"
                style={{
                  width: "80px",
                  height: "80px",
                  border: "3px solid #e9ecef",
                }}
              >
                <img
                  src={
                    userToDelete?.avatar ||
                    "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300"
                  }
                  alt={userToDelete?.name}
                  className="w-100 h-100 object-fit-cover"
                />
              </div>
              <p className="mb-1">Are you sure you want to delete</p>
              <p className="fw-bold mb-0">{userToDelete?.name}</p>
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
              Delete User
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </MainLayout>
  );
};

export default UsersList;
