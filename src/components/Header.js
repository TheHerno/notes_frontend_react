import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import UserModule from "./../utils/UserModule";

export default function Header() {
  const [redirect, setRedirect] = useState(false);
  const cerrarSesion = () => {
    UserModule.logout();
    setRedirect(true);
  };
  return (
    <Navbar variant="dark" bg="dark">
      {redirect && <Redirect to="/login" />}
      <Navbar.Brand href="/">SuperApp de Notitas</Navbar.Brand>
      {UserModule.logged ? (
        <Nav className="mr-auto">
          <Nav.Link href="/notes">Notas</Nav.Link>
          <Nav.Link onClick={cerrarSesion} href="#">
            Cerrar Sesión
          </Nav.Link>
        </Nav>
      ) : (
        <Nav className="mr-auto">
          <Nav.Link href="/login">Iniciar Sesión</Nav.Link>
          <Nav.Link href="/signup">Registrarse</Nav.Link>
        </Nav>
      )}
    </Navbar>
  );
}
