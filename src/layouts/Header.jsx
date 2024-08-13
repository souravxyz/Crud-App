import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/slice/authSlice";
import { profile_pic } from "../Api/Endpoints";
import { Container, Nav, Navbar, Dropdown, Button } from "react-bootstrap";
import "./Header.css"; // Ensure this CSS file is included

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const user = localStorage.getItem("name");
  const profileImage = localStorage.getItem("proimg");
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
    setShowDropdown(false);
  };

  const handleToggleDropdown = () => setShowDropdown((prev) => !prev);

  const defaultProfilePic =
    "https://plus.unsplash.com/premium_photo-1677094310899-02303289cadf?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWklMjB1c2VyJTVDfGVufDB8fDB8fHww";

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand as={Link} to="/" className="custom-navbar-brand">
          WTS-Academy
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link to="/createProduct" className="btn btn-success">
              Create Product
            </Link>
            {token && (
              <Dropdown
                show={showDropdown}
                align="end"
                className="custom-dropdown"
                onToggle={handleToggleDropdown}
              >
                <Dropdown.Toggle
                  as={Button}
                  className="profile-btn"
                  variant="link"
                  id="profile-dropdown"
                  onClick={handleToggleDropdown}
                >
                  <img
                    src={
                      profileImage
                        ? profile_pic(profileImage)
                        : defaultProfilePic
                    }
                    alt="Profile"
                    className="profile-img"
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu className="custom-dropdown-menu">
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right"></i> Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
