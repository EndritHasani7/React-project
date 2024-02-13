import { useLocalStorage } from '@uidotdev/usehooks';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from "react-router-dom";
import "./menu.css"

function Menu() {
  const [cart, setCart] = useLocalStorage('cart', [])
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isloggedin')
  const navigate = useNavigate()

  const handleLogout = () => {
    setIsLoggedIn(null)
    navigate("/");
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/" className="menu-title">React Store</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/" className="menu-item">Home</Nav.Link>
            <Nav.Link href="/shop" className="menu-item">Shop</Nav.Link>
            <Nav.Link href="/cart" className="menu-item">Cart ({cart.length})</Nav.Link>
            <NavDropdown title={(isLoggedIn == null) ? 'Guest' : isLoggedIn.email} id="basic-nav-dropdown">
              {
                (isLoggedIn == null) ? <>
                  <NavDropdown.Item href="/login" className="drop-menu-item">Login</NavDropdown.Item>
                  <NavDropdown.Item href="/register" className="drop-menu-item">Register</NavDropdown.Item>
                </> : <>
                  <NavDropdown.Item href="/dashboard" className="drop-menu-item">Dashboard</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout} className="drop-menu-item">Logout</NavDropdown.Item>
                </>
              }
              
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Menu