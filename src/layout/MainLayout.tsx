import { ReactNode, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
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
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const navItems = [
    {
      to: "/dashboard",
      icon: <LayoutDashboard size={18} />,
      label: "Dashboard",
    },
    { to: "/users", icon: <Users size={18} />, label: "Users" },
    { to: "/templates", icon: <FileText size={18} />, label: "Templates" },
    { to: "/menus", icon: <List size={18} />, label: "Menus" },
    { to: "/forms", icon: <ClipboardList size={18} />, label: "Forms" },
    { to: "/settings", icon: <Settings size={18} />, label: "Settings" },
  ];

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
            {navItems.map(({ to, icon, label }) => {
              const isActive = location.pathname.startsWith(to);
              return (
                <li key={to} className="nav-item">
                  <Link
                    to={to}
                    className={`nav-link d-flex align-items-center gap-2 ${
                      isActive ? "active text-white bg-primary" : "text-white"
                    }`}
                  >
                    {icon}
                    {!sidebarCollapsed && label}
                  </Link>
                </li>
              );
            })}
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
