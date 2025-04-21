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
  ListGroup,
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
    <MainLayout title="Menus Management">
      <div className="page-fade-in">
        <Row className="mb-4 align-items-center">
          <Col md={6}>
            <InputGroup>
              <InputGroup.Text>🔍</InputGroup.Text>
              <Form.Control
                placeholder="Search menus..."
                value={searchTerm}
                onChange={onSearchChange}
              />
            </InputGroup>
          </Col>
          <Col md={6} className="text-end">
            <Button variant="primary" onClick={onAddMenu}>
              + Add Menu
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
            ) : filteredMenus.length > 0 ? (
              <ListGroup>
                {filteredMenus.map((menu) => (
                  <ListGroup.Item key={menu.id}>
                    <Row>
                      <Col>
                        <strong>Title:</strong> {menu.title} <br />
                        <strong>Type:</strong> {menu.type} <br />
                        <strong>Status:</strong> {menu.status}
                      </Col>
                      <Col md="auto" className="text-end">
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => onDeleteClick(menu.id)}
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
                  ? "No menus found matching your search."
                  : "No menus found."}
              </Alert>
            )}
          </Card.Body>
        </Card>

        <Modal show={showDeleteModal} onHide={onCloseDeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this menu?</Modal.Body>
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

export default MenusList;
