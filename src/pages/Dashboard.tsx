import React from "react";
import { Card, Row, Col, Button, Badge } from "react-bootstrap";
import MainLayout from "../layout/MainLayout";

interface User {
  name: string;
}

interface Template {
  id: number;
  title: string;
  type: string;
}

interface Stats {
  users: number;
  templates: number;
  menus: number;
  forms: number;
}

interface DashboardProps {
  user: User | null;
  stats: Stats;
  templates: Template[];
  loading: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({
  user,
  stats,
  templates,
  loading,
}) => {
  return (
    <MainLayout title="Dashboard">
      <div className="page-fade-in">
        <Row className="mb-4">
          <Col>
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <h4 className="mb-0">Welcome, {user?.name || "User"}!</h4>
                <p className="text-muted">
                  Here's what's happening with your admin panel today.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="g-4 mb-4">
          {[
            {
              title: "Total Users",
              count: stats.users,
              variant: "primary",
              icon: "bi-people",
              link: "/users",
            },
            {
              title: "Templates",
              count: stats.templates,
              variant: "success",
              icon: "bi-file-earmark-text",
              link: "/templates",
            },
            {
              title: "Menus",
              count: stats.menus,
              variant: "info",
              icon: "bi-list",
              link: "/menus",
            },
            {
              title: "Forms",
              count: stats.forms,
              variant: "warning",
              icon: "bi-ui-checks",
              link: "/forms",
            },
          ].map(({ title, count, variant, icon, link }) => (
            <Col md={6} xl={3} key={title}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="text-muted fw-normal">{title}</h6>
                      <h3 className="fw-bold mb-0">
                        {loading ? (
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        ) : (
                          count
                        )}
                      </h3>
                    </div>
                    <div className={`bg-${variant} text-white p-3 rounded`}>
                      <i className={`bi ${icon}`}></i>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Button
                      variant={`outline-${variant}`}
                      size="sm"
                      href={link}
                    >
                      View {title}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <Row>
          <Col lg={8}>
            <Card className="border-0 shadow-sm mb-4">
              <Card.Header className="bg-white border-0">
                <h5 className="mb-0">Recent Templates</h5>
              </Card.Header>
              <Card.Body>
                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Title</th>
                          <th>Type</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {templates.slice(0, 5).map((template) => (
                          <tr key={template.id}>
                            <td>{template.title}</td>
                            <td>{template.type}</td>
                            <td>
                              <Badge
                                bg={
                                  template.type === "static"
                                    ? "primary"
                                    : "success"
                                }
                              >
                                {template.type}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                        {templates.length === 0 && (
                          <tr>
                            <td colSpan={3} className="text-center">
                              No templates found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="border-0 shadow-sm mb-4">
              <Card.Header className="bg-white border-0">
                <h5 className="mb-0">Quick Actions</h5>
              </Card.Header>
              <Card.Body>
                <div className="d-grid gap-2">
                  <Button variant="outline-primary" href="/users/add">
                    Add New User
                  </Button>
                  <Button variant="outline-success" href="/templates/add">
                    Create Template
                  </Button>
                  <Button variant="outline-info" href="/menus/add">
                    Add Menu
                  </Button>
                  <Button variant="outline-warning" href="/forms/add">
                    Create Form
                  </Button>
                  <Button variant="outline-secondary" href="/settings">
                    Edit Settings
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
