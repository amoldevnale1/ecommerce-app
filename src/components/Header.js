import React, { useRef, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import Overlay from "react-bootstrap/Overlay";
import Table from "react-bootstrap/esm/Table";
import "./Header.css";

export default function Header() {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  return (
    <>
      <Navbar bg="dark" className="navbar">
        <Container>
          <Nav>
            <NavLink to="/" className="text-decoration-none text-light navlink">
              Home
            </NavLink>
          </Nav>
          <span>
            <i className="fa fa-cart-plus text-light cart-icon" aria-hidden="true" ref={target} onClick={() => setShow(!show)}>
            </i>
          </span>
        </Container>
      </Navbar>
    </>
  );
}
