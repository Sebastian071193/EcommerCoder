import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { CartWidget } from "./CartWidget";
import logo from "../data/imagenes/Logo.jpg"; 

export const NavBar = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg">
      <Container className="d-flex justify-content-between align-items-center">
       
        <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center">
          <CartWidget style={{ color: "#f5f5dc" }} />
        </Navbar.Brand>

      
        <Navbar.Brand
          as={NavLink}
          to="/"
          className="d-flex flex-column align-items-center mx-auto"
        >
          <img
            src={logo}
            alt="Guitar Haven Logo"
            style={{ width: "80px", height: "80px", marginBottom: "0.5rem" }}
          />
          <span
            style={{
              color: "#f5f5dc",  
              fontSize: "1.5rem",
              fontWeight: "bold",
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            Guitar Haven
          </span>
        </Navbar.Brand>

     
        <Nav className="d-flex">
          <Nav.Link
            as={NavLink}
            to="/category/guitarra"
            style={{ color: "white", fontSize: "1rem" }}
          >
            Guitarras
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to="/category/amplificador"
            style={{ color: "white", fontSize: "1rem" }}
          >
            Amplificadores
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};