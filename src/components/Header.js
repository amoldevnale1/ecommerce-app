import React, { useCallback, useEffect, useRef, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import "./Header.css";
import Overlay from "react-bootstrap/Overlay";
import Table from "react-bootstrap/esm/Table";
import { useDispatch, useSelector } from "react-redux";
import { ApiService } from "../service/Api";
import * as url from "../constants/urls";
import { ADD_TO_CART, SET_LOADER, REMOVE_CART } from "../redux/actions/action";

export default function Header() {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const [price, setPrice] = useState(0);

  // get data from cart
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(SET_LOADER(true));
    ApiService.fetch(url.getCartData()).then((response) => {
      dispatch(ADD_TO_CART(response.line_items));
      dispatch(SET_LOADER(false));
    });
  }, []);

  // get data from store
  const getCartData = useSelector((store) => store.reducer.carts);

  // remove product from cart
  const remove_cart = async (id) => {
    dispatch(SET_LOADER(true));
    await ApiService.delete(url.removePrdFromCart(id)).then((response) => {
      dispatch(REMOVE_CART(id));
      dispatch(SET_LOADER(false));
    });
  };

  // calculate total price
  const total = useCallback(() => {
    let price = 0;
    getCartData.map((ele) => {
       return price = ele.price.raw * ele.quantity + price;
    });
    setPrice(price);
  }, [getCartData]);

  useEffect(() => {
    total();
  }, [total]);

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
                ref={target}
                onClick={() => setShow(!show)}
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
          <Overlay
            target={target.current}
            show={show}
            onHide={() => setShow(false)}
            placement="bottom"
            rootClose
            className="over"
          >
            {getCartData.length ? (
              <div>
                <Table>
                  <thead className="table-heading">
                    <tr>
                      <th>Photo</th>
                      <th>Details</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody className="table-body">
                    {getCartData.map((prodData) => {
                      return (
                        <tr key={prodData.product_id}>
                          <td>
                            <NavLink to={`/productDetails/${prodData.product_id}`}>
                              <img
                                className="prd-img"
                                src={prodData.product_meta.image_url}
                                alt=""
                                onClick={() => setShow(false)}
                              />
                            </NavLink>
                          </td>
                          <td>
                            <div className="cart-product-title">
                              {prodData.name}
                            </div>
                            <div>
                              Price : {prodData.price.formatted_with_symbol}
                            </div>
                            <div>Quantity : {prodData.quantity}</div>
                          </td>

                          <td
                            className="remove-cart"
                            onClick={() => remove_cart(prodData.id)}
                          >
                            <i className="fas fa-trash"></i>
                          </td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td></td>
                      <td>
                        <span className="cart-product-title">Total :</span> ₹{price}
                      </td>
                      <td></td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            ) : (
              <div className="card-details d-flex justify-content-center align-items-center cart-div">
                <i className="fas fa-close smallclose close-icon" onClick={() => setShow(false)}></i>
                <p className="empty-cart">Your carts is empty</p>
                <img
                  src="./cart.gif"
                  alt=""
                  className="empty-cart-img"
                />
              </div>
            )}
          </Overlay>
        </Container>
      </Navbar>
    </>
  );
}
