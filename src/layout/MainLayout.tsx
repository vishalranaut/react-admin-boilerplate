import { ReactNode, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import NavigationBar from '../components/NavigationBar';

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

      <div className="flex-grow-1 d-flex pt-5 mt-4">
        <div 
          className={`sidebar d-flex flex-column flex-shrink-0 p-3 text-white ${
            sidebarCollapsed ? 'collapsed' : ''
          }`}
          style={{ width: sidebarCollapsed ? '80px' : '250px' }}
        >
          <Button 
            variant="link" 
            className="align-self-end text-white p-0 border-0"
            onClick={toggleSidebar}
          >
            {sidebarCollapsed ? '»' : '«'}
          </Button>
          
          <hr />
          
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <a href="/dashboard" className="nav-link text-white">
                {sidebarCollapsed ? '🏠' : 'Dashboard'}
              </a>
            </li>
            <li>
              <a href="/users" className="nav-link text-white">
                {sidebarCollapsed ? '👥' : 'Users'}
              </a>
            </li>
            <li>
              <a href="/templates" className="nav-link text-white">
                {sidebarCollapsed ? '📄' : 'Templates'}
              </a>
            </li>
            <li>
              <a href="/menus" className="nav-link text-white">
                {sidebarCollapsed ? '📑' : 'Menus'}
              </a>
            </li>
            <li>
              <a href="/forms" className="nav-link text-white">
                {sidebarCollapsed ? '📝' : 'Forms'}
              </a>
            </li>
            <li>
              <a href="/settings" className="nav-link text-white">
                {sidebarCollapsed ? '⚙️' : 'Settings'}
              </a>
            </li>
          </ul>
        </div>

        <div className="main-content flex-grow-1 p-4" style={{ marginLeft: sidebarCollapsed ? '80px' : '250px' }}>
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