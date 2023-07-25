import React, { useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { ApiService } from "../service/Api";
import * as url from "../constants/urls";
import { ADD_TO_CART } from "../redux/actions/action";

export default function Header() {

  // get data from cart
  const dispatch = useDispatch();
  useEffect(() => {
    ApiService.fetch(url.addProductToCart()).then((response) => {
      dispatch(ADD_TO_CART(response.line_items));
    });
  }, [dispatch]);

  const getCartData = useSelector((store) => store.cartReducer.carts);

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
            <span>
              <i
                className="fa fa-cart-plus text-light cart-icon"
                aria-hidden="true"
              ></i>
            </span>

            <span>
              {getCartData.length ? (
                <Badge bg="primary" className="badge-icon">
                  {getCartData.length}
                </Badge>
              ) : (
                ""
              )}
            </span>
          </span>
        </Container>
      </Navbar>
    </>
  );
}
