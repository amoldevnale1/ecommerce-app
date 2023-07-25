import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./ProductList.css";
import { ApiService } from "../service/Api";
import * as url from "../constants/urls";
import { useDispatch } from "react-redux";
import { ADD_TO_CART } from "../redux/actions/action";

export default function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProductListData();
  }, []);

  // fetch product list
  const getProductListData = async () => {
    const productListData = await ApiService.fetch(url.getAllProductList());
    setProducts(productListData.data);
  };

  const dispatch = useDispatch();

  // add to cart
  const sendProdToCartData = async (product) => {
    await ApiService.post(url.addProductToCart(), { id: product.id }).then(
      (response) => {
        dispatch(ADD_TO_CART(response.line_items));
      }
    );
  };

  return (
    <>
      <div className="container mt-3">
        <h2 className="text-center">Product List</h2>
        <div className="row d-flex justify-content-center align-items-center">
          {products?.map((product, index) => {
            return (
              <Card
                key={product.id}
                className="mx-2 mt-4 card-style"
              >
                <Card.Img
                  variant="top"
                  src={product.meta.image_url}
                  className="mt-3 cart-img"
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>
                    Price : {product.price.formatted_with_symbol}
                  </Card.Text>
                  <div className="button_div d-flex justify-content-center">
                    <Button
                      variant="primary"
                      className="col-lg-12"
                      onClick={() => sendProdToCartData(product)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
}
