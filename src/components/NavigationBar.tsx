import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Image, Dropdown } from "react-bootstrap";
import { RootState } from "../store";
import { logout } from "../store/reducers/authSlice";

const NavigationBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const avatarUrl =
    user?.avatar ||
    "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100";

  return (
    <Navbar
      bg="dark"
      variant="dark"
      fixed="top"
      className="px-3 shadow-sm"
      style={{ height: "56px", zIndex: 1050 }}
    >
      <Container
        fluid
        className="d-flex justify-content-between align-items-center"
      >
        <Navbar.Brand as={Link} to="/dashboard" className="fw-semibold">
          Admin Panel
        </Navbar.Brand>

        {user && (
          <Dropdown align="end">
            <Dropdown.Toggle
              variant="link"
              bsPrefix="p-0 border-0 bg-transparent"
              id="dropdown-user"
              className="d-flex align-items-center text-white"
            >
              <Image
                src={avatarUrl}
                roundedCircle
                width={32}
                height={32}
                className="me-2"
                style={{ objectFit: "cover" }}
                alt="User avatar"
              />
              <span className="d-none d-sm-inline">{user.name}</span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/profile">
                Profile
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/change-password">
                Change Password
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
