import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./CartDetails.css";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { REMOVE_CART, SET_LOADER, ADD_TO_CART } from "../redux/actions/action";
import { ApiService } from "../service/Api";
import * as url from "../constants/urls";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, NavLink } from "react-router-dom";

export default function CartDetails() {
  // get data from store
  const getCartData = useSelector((store) => store.reducer.carts);

  // remove product from cart
  const dispatch = useDispatch();
  const removeProdFromCart = async (id) => {
    dispatch(SET_LOADER(true));
    await ApiService.delete(url.removePrdFromCart(id)).then((response) => {
      if (response) {
        dispatch(REMOVE_CART(id));
        dispatch(SET_LOADER(false));
      }
    });
  };

  // update product quantity
  const updateQuantity = (product, action) => {
    if (action === "inc") {
      product.quantity++;
    } else if (action === "dec") {
      product.quantity--;
    }
    dispatch(ADD_TO_CART(getCartData));
  };

  // buy now button
  const navigate = useNavigate();
  const buyNowCartItems = () => {
    toast.success("Order placed successfully.!");
    setTimeout(() => {
      dispatch(ADD_TO_CART([]));
      navigate("/");
    }, 6000);
  };

  // calculate sub total
  function getSubTotal() {
    let subTotal = 0;
    getCartData?.forEach(
      (ele, index) => (subTotal = subTotal + ele.price.raw * ele.quantity)
    );
    return subTotal;
  }

  return (
    <>
      <div className="container mt-2">
        <h2 className="text-center">Cart Details</h2>
        <ToastContainer theme="colored" />
        {getCartData.length ? (
          <div>
            {getCartData?.map((prodDetails, index) => {
              return (
                <div>
                  <section className="container mt-3">
                    <div className="iteamsdetails">
                      <React.Fragment key={index}>
                        <div className="items-img">
                          <img
                            src={prodDetails.product_meta.image_url}
                            alt=""
                          />
                        </div>
                        <div className="details">
                          <Table>
                            <Row>
                              <Col>
                                <p>
                                  <strong>Name</strong>: {prodDetails.name}
                                </p>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <p>
                                  <strong>Price</strong>:{" "}
                                  {prodDetails.line_total.formatted_with_symbol}
                                </p>
                              </Col>
                              <Col>
                                <p>
                                  <strong>Rating</strong>:{" "}
                                  <span className="star-icon">
                                    {prodDetails.product_meta.rating} &nbsp;
                                    <i
                                      className="fa fa-star"
                                      aria-hidden="true"
                                    ></i>
                                  </span>
                                </p>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <p>
                                  <strong>Review</strong>:{" "}
                                  {prodDetails.product_meta.review}
                                </p>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <p>
                                  <strong>Total</strong>: ₹
                                  {prodDetails.line_total.raw *
                                    prodDetails.quantity}
                                </p>
                              </Col>
                              <Col>
                                <div className="d-flex justify-content-between align-items-center prd-inc-dec">
                                  {prodDetails.quantity > 1 ? (
                                    <span
                                      className="prd-dec"
                                      onClick={() =>
                                        updateQuantity(prodDetails, "dec")
                                      }
                                    >
                                      -
                                    </span>
                                  ) : (
                                    <span className="prd-dec" aria-disabled>
                                      -
                                    </span>
                                  )}
                                  <span className="prd-qnty">
                                    {prodDetails.quantity}
                                  </span>
                                  <span
                                    className="prd-inc"
                                    onClick={() =>
                                      updateQuantity(prodDetails, "inc")
                                    }
                                  >
                                    +
                                  </span>
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <p>
                                  <strong>Remove</strong>:{" "}
                                  <span>
                                    <i
                                      onClick={() =>
                                        removeProdFromCart(prodDetails.id)
                                      }
                                      className="fas fa-trash trash"
                                    ></i>
                                  </span>
                                </p>
                              </Col>
                            </Row>
                          </Table>
                        </div>
                      </React.Fragment>
                    </div>
                  </section>
                </div>
              );
            })}{" "}
          </div>
        ) : (
          <section className="container mt-3 second-section">
            <div className="sub-total">
              <div>
                <Row className="justify-content-md-center">
                  <Col className="subtotal">
                    Your Cart is empty now. Click <NavLink to="/">here</NavLink>{" "}
                    to continue shopping.
                  </Col>
                </Row>
              </div>
            </div>
          </section>
        )}
      </div>
      {getCartData.length ? (
        <section className="container mt-5 second-section">
          <div className="sub-total">
            <div>
              <Row>
                <Col className="subtotal">
                  Subtotal : ₹ {getCartData ? getSubTotal() : ""}
                </Col>
              </Row>
            </div>
            <div>
              <Button variant="primary" onClick={buyNowCartItems}>
                Buy Now
              </Button>{" "}
            </div>
          </div>
        </section>
      ) : (
        ""
      )}
      <br />
      <br />
    </>
  );
}
