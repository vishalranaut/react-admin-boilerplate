import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container className="py-5 mt-5">
      <Row className="justify-content-center text-center">
        <Col md={8} lg={6}>
          <h1 className="display-1 fw-bold">404</h1>
          <h2 className="mb-4">Page Not Found</h2>
          <p className="lead mb-5">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Button as={Link as any} to="/dashboard" variant="primary" size="lg">
            Go to Dashboard
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
