import React from "react";
import {
  Card,
  Table,
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
                <Table hover>
                  <thead>
                    <tr>
                      <th>Avatar</th>
                      <th>Name</th>
                      <th>Username</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>
                          <img
                            src={
                              user.avatar ||
                              "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300"
                            }
                            alt={user.name}
                            className="avatar"
                          />
                        </td>
                        <td>{user.name}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>
                          <Badge
                            bg={
                              user.role === "admin"
                                ? "danger"
                                : user.role === "editor"
                                ? "primary"
                                : "warning"
                            }
                          >
                            {user.role}
                          </Badge>
                        </td>
                        <td>
                          <Button
                            as={Link as any}
                            to={`/users/edit/${user.id}`}
                            variant="outline-primary"
                            size="sm"
                            className="me-2"
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => onDeleteClick(user.id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}

                    {users.length === 0 && (
                      <tr>
                        <td colSpan={6} className="text-center py-5">
                          {searchTerm
                            ? "No users found matching your search."
                            : "No users found."}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            )}
          </Card.Body>
        </Card>

        {/* Delete Confirmation Modal */}
        <Modal show={showDeleteModal} onHide={onCloseDeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete{" "}
            <strong>{userToDelete?.name}</strong>? This action cannot be undone.
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

export default UsersList;
