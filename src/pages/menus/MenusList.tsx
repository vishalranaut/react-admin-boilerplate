import React from "react";
import MainLayout from "../../layout/MainLayout";
import { Menu } from "../../services/pageService";
import {
  Card,
  Button,
  Spinner,
  Form,
  InputGroup,
  Row,
  Col,
  Modal,
  Table,
  Alert,
} from "react-bootstrap";

interface MenusListProps {
  menus: Menu[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  showDeleteModal: boolean;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteClick: (id: number) => void;
  onDeleteConfirm: () => void;
  onCloseDeleteModal: () => void;
  onAddMenu: () => void;
}

const MenusList: React.FC<MenusListProps> = ({
  menus,
  loading,
  error,
  searchTerm,
  showDeleteModal,
  onSearchChange,
  onDeleteClick,
  onDeleteConfirm,
  onCloseDeleteModal,
  onAddMenu,
}) => {
  const filteredMenus = menus.filter(
    (menu) =>
      menu.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      menu.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      menu.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout title="Menus">
      <div className="page-fade-in">
        <div className="d-flex justify-content-end mb-4">
          <Button variant="primary" onClick={onAddMenu} className="me-3">
            + Add Menu
          </Button>
        </div>

        <InputGroup className="mb-4">
          <InputGroup.Text>🔍</InputGroup.Text>
          <Form.Control
            placeholder="Search by title, type, or status..."
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
            ) : filteredMenus.length > 0 ? (
              <div className="table-responsive">
                <Table hover responsive className="align-middle">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMenus.map((menu) => (
                      <tr key={menu.id}>
                        <td>{menu.title}</td>
                        <td>{menu.type}</td>
                        <td>{menu.status}</td>
                        <td className="text-end">
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => onDeleteClick(menu.id)}
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
                  ? "No menus found matching your search."
                  : "No menus found."}
              </Alert>
            )}
          </Card.Body>
        </Card>

        <Modal show={showDeleteModal} onHide={onCloseDeleteModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Delete Menu</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this menu? This action cannot be
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

export default MenusList;
