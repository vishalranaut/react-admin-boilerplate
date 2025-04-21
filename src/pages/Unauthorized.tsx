import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <Container className="py-5 mt-5">
      <Row className="justify-content-center text-center">
        <Col md={8} lg={6}>
          <h1 className="display-1 fw-bold">403</h1>
          <h2 className="mb-4">Access Denied</h2>
          <p className="lead mb-5">
            You don't have permission to access this page. Please contact your
            administrator.
          </p>
          <Button as={Link as any} to="/dashboard" variant="primary" size="lg">
            Go to Dashboard
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Unauthorized;
