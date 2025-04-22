import { ReactNode, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import NavigationBar from "../components/NavigationBar";
import {
  LayoutDashboard,
  Users,
  FileText,
  List,
  ClipboardList,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
}

const MainLayout = ({ children, title }: MainLayoutProps) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavigationBar />

      <div className="flex-grow-1 d-flex pt-5">
        <div
          className={`sidebar d-flex flex-column flex-shrink-0 p-3 text-white ${
            sidebarCollapsed ? "collapsed" : ""
          }`}
          style={{
            width: sidebarCollapsed ? "80px" : "250px",
            backgroundColor: "#343a40",
          }}
        >
          <Button
            variant="link"
            className="align-self-end text-white p-0 border-0"
            onClick={toggleSidebar}
          >
            {sidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </Button>

          <br />

          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <a
                href="/dashboard"
                className="nav-link text-white d-flex align-items-center gap-2"
              >
                <LayoutDashboard size={18} />
                {!sidebarCollapsed && "Dashboard"}
              </a>
            </li>
            <li>
              <a
                href="/users"
                className="nav-link text-white d-flex align-items-center gap-2"
              >
                <Users size={18} />
                {!sidebarCollapsed && "Users"}
              </a>
            </li>
            <li>
              <a
                href="/templates"
                className="nav-link text-white d-flex align-items-center gap-2"
              >
                <FileText size={18} />
                {!sidebarCollapsed && "Templates"}
              </a>
            </li>
            <li>
              <a
                href="/menus"
                className="nav-link text-white d-flex align-items-center gap-2"
              >
                <List size={18} />
                {!sidebarCollapsed && "Menus"}
              </a>
            </li>
            <li>
              <a
                href="/forms"
                className="nav-link text-white d-flex align-items-center gap-2"
              >
                <ClipboardList size={18} />
                {!sidebarCollapsed && "Forms"}
              </a>
            </li>
            <li>
              <a
                href="/settings"
                className="nav-link text-white d-flex align-items-center gap-2"
              >
                <Settings size={18} />
                {!sidebarCollapsed && "Settings"}
              </a>
            </li>
          </ul>
        </div>

        <div
          className="main-content flex-grow-1 p-4"
          style={{ marginLeft: sidebarCollapsed ? "80px" : "250px" }}
        >
          {title && <h2 className="mb-4">{title}</h2>}
          <Container fluid>
            <Row>
              <Col>{children}</Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
