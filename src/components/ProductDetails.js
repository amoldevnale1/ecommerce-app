import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ApiService } from "../service/Api";
import * as url from "../constants/urls";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductDetails.css";
import { useDispatch } from "react-redux";
import { SET_LOADER } from "../redux/actions/action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "react-bootstrap";

export default function ProductDetails() {
  const [productDetails, setProductDetails] = useState([]);
  const [quantity, setQuantity] = useState(1);

  let { productId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    getProductDetails();
  }, []);

  // fetch product details data
  function getProductDetails() {
    dispatch(SET_LOADER(true));
    ApiService.fetch(url.getProductDetails(productId)).then((response) => {
      if(response) {
        dispatch(SET_LOADER(false));
        setProductDetails([response]);
      }
    });
  };

  // buy now button
  const navigate = useNavigate();
  const buyNow = () => {
    toast.success("Order placed successfully.!");
    setTimeout(() => {
      navigate("/");
    }, 6000);
  };

  return (
    <>
      <div className="container mt-2">
        <h2 className="text-center">Product Details</h2>
        <ToastContainer theme="colored" />
        <section className="container mt-3">
          <div className="iteamsdetails">
            {productDetails?.map((prodDetails, index) => {
              return (
                <React.Fragment key={index}>
                  <div className="items-img">
                    <img src={prodDetails.meta.image_url} alt="" />
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
                            <strong>Price</strong>: {prodDetails.price.formatted_with_symbol}
                          </p>
                        </Col>
                        <Col>
                          <p>
                            <strong>Rating</strong>: <span className="star-icon">
                                {prodDetails.meta.rating} &nbsp;
                              <i className="fa fa-star" aria-hidden="true"></i>
                            </span>
                          </p>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <p>
                            <strong>Review</strong>:  {prodDetails.meta.review}
                          </p>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <p>
                            <strong>Description</strong>: {prodDetails.description}
                          </p>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <p>
                            <strong>Total</strong>: ₹
                            {prodDetails.price.raw * quantity}
                          </p>
                        </Col>
                        <Col>
                          <div className="d-flex justify-content-between align-items-center prd-inc-dec">
                            {quantity > 1 ? (
                              <span
                                className="prd-dec"
                                onClick={() => setQuantity(quantity - 1)}
                              >
                                -
                              </span>
                            ) : (
                              <span className="prd-dec" aria-disabled>
                                -
                              </span>
                            )}
                            <span className="prd-qnty">{quantity}</span>
                            <span
                              className="prd-inc"
                              onClick={() => setQuantity(quantity + 1)}
                            >
                              +
                            </span>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Button
                          variant="success"
                          className="buy-now-button"
                          onClick={buyNow}
                        >
                          Buy Now
                        </Button>
                      </Row>
                    </Table>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
