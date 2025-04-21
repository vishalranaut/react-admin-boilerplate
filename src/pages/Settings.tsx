import { useState, useEffect } from "react";
import { Form, Button, Card, Row, Col, Alert, Tab, Nav } from "react-bootstrap";
import MainLayout from "../layout/MainLayout";
import api from "../services/api";

interface Settings {
  theme: string;
  font: string;
  logo: string;
}

const Settings = () => {
  const [settings, setSettings] = useState<Settings>({
    theme: "light",
    font: "Roboto",
    logo: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const response = await api.get("/settings");
        setSettings(response.data);
      } catch (err) {
        setError("Failed to load settings");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target as HTMLInputElement | HTMLSelectElement;
    setSettings({ ...settings, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await api.put("/settings", settings);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError("Failed to save settings");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout title="System Settings">
      <div className="page-fade-in">
        <Row>
          <Col>
            <Card className="border-0 shadow-sm mb-4">
              <Card.Body>
                <Tab.Container id="settings-tabs" defaultActiveKey="appearance">
                  <Row>
                    <Col md={3}>
                      <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                          <Nav.Link eventKey="appearance">Appearance</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="system">System</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="about">About</Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </Col>
                    <Col md={9}>
                      <Tab.Content>
                        <Tab.Pane eventKey="appearance">
                          {error && <Alert variant="danger">{error}</Alert>}
                          {success && (
                            <Alert variant="success">
                              Settings saved successfully!
                            </Alert>
                          )}

                          <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="theme">
                              <Form.Label>Theme</Form.Label>
                              <Form.Select
                                name="theme"
                                value={settings.theme}
                                onChange={handleInputChange}
                              >
                                <option value="light">Light</option>
                                <option value="dark">Dark</option>
                                <option value="blue">Blue</option>
                              </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="font">
                              <Form.Label>Font</Form.Label>
                              <Form.Select
                                name="font"
                                value={settings.font}
                                onChange={handleInputChange}
                              >
                                <option value="Roboto">Roboto</option>
                                <option value="Poppins">Poppins</option>
                                <option value="Open Sans">Open Sans</option>
                                <option value="Lato">Lato</option>
                              </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="logo">
                              <Form.Label>Logo URL</Form.Label>
                              <Form.Control
                                type="text"
                                name="logo"
                                value={settings.logo}
                                onChange={handleInputChange}
                                placeholder="Enter logo URL"
                              />
                              <Form.Text className="text-muted">
                                Recommended size: 150x50 pixels
                              </Form.Text>
                            </Form.Group>

                            <div className="mt-4">
                              <Button
                                variant="primary"
                                type="submit"
                                disabled={loading}
                              >
                                {loading ? (
                                  <>
                                    <span
                                      className="spinner-border spinner-border-sm me-2"
                                      role="status"
                                      aria-hidden="true"
                                    ></span>
                                    Saving...
                                  </>
                                ) : (
                                  "Save Settings"
                                )}
                              </Button>
                            </div>
                          </Form>
                        </Tab.Pane>

                        <Tab.Pane eventKey="system">
                          <h5 className="mb-4">System Information</h5>

                          <div className="mb-3">
                            <strong>Version:</strong> 1.0.0
                          </div>
                          <div className="mb-3">
                            <strong>Database:</strong> JSON Server
                          </div>
                          <div className="mb-3">
                            <strong>Environment:</strong> Development
                          </div>

                          <hr />

                          <h5 className="mb-3">Maintenance</h5>
                          <Button variant="outline-secondary" className="me-2">
                            Clear Cache
                          </Button>
                          <Button variant="outline-danger">
                            Reset to Defaults
                          </Button>
                        </Tab.Pane>

                        <Tab.Pane eventKey="about">
                          <h5 className="mb-3">About This Admin Panel</h5>
                          <p>
                            This professional React Admin Panel was built using
                            React, TypeScript, Bootstrap, Redux, and JSON
                            Server. It provides a comprehensive set of tools for
                            managing users, pages, and content.
                          </p>

                          <h5 className="mb-3 mt-4">Technologies Used</h5>
                          <ul>
                            <li>React + TypeScript</li>
                            <li>React Bootstrap</li>
                            <li>Redux Toolkit with Redux-Saga</li>
                            <li>React Router v6</li>
                            <li>JSON Server (Mock API)</li>
                          </ul>
                        </Tab.Pane>
                      </Tab.Content>
                    </Col>
                  </Row>
                </Tab.Container>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};

export default Settings;
