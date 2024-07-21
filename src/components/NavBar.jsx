import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { CartWidget } from "./CartWidget";

export const NavBar = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Full Belly Burgers</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#home">Inicio</Nav.Link>
          <Nav.Link href="#features">Nuestro Menú</Nav.Link>
          <Nav.Link href="#pricing">¿Quienes somos?</Nav.Link>
        </Nav>
        <CartWidget />
      </Container>
    </Navbar>
  );
};
