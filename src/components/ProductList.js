import React, { useState, useEffect, useMemo } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./ProductList.css";
import { ApiService } from "../service/Api";
import * as url from "../constants/urls";
import { useDispatch } from "react-redux";
import { ADD_TO_CART, SET_LOADER } from "../redux/actions/action";
import Pagination from "react-bootstrap/Pagination";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    getProductListData();
  }, [currentPage]);

  // fetch product list
  const getProductListData = async () => {
    dispatch(SET_LOADER(true));
    const newUrl = new URL(url.getAllProductList());
    const params = {
      limit: "6",
      page: currentPage,
    };
    Object.keys(params).forEach((key) =>
      newUrl.searchParams.append(key, params[key])
    );
    const productListData = await ApiService.fetch(newUrl);
    setProducts(productListData.data);
    setTotalPages(productListData.meta);
    dispatch(SET_LOADER(false));
  };

  // iterate pagination no of total pages
  const setTotalPages = (paginationData) => {
    let totalPages = [];
    for (
      let pageNum = 1;
      pageNum <= paginationData.pagination.total_pages;
      pageNum++
    ) {
      totalPages.push(pageNum);
      setPages(totalPages);
    }
  };

  // for scroll top
  useMemo(() => {
    window.scrollTo({top: 0})
  }, [currentPage]);

  // add to cart
  const dispatch = useDispatch();
  const sendProdToCartData = async (product) => {
    dispatch(SET_LOADER(true));
    await ApiService.post(url.addProductToCart(), { id: product.id }).then(
      (response) => {
        dispatch(ADD_TO_CART(response.line_items));
        dispatch(SET_LOADER(false));
      }
    );
  };

  // view product details
  const viewProdDetails = async (product) => {
    navigate(`/productDetails/${product.id}`);
  };

  return (
    <>
      <div className="container mt-3">
        <h2 className="text-center">Product List</h2>
        <div className="row d-flex justify-content-center align-items-center">
          {products?.map((product, index) => {
            return (
              <Card key={product.id} className="mx-2 mt-4 card-style">
                <Card.Img
                  variant="top"
                  src={product.meta.image_url}
                  className="mt-3 cart-img"
                  onClick={() => viewProdDetails(product)}
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
        {
          pages.length ? 
          <div className="pagination">
            <Pagination size="lg">
              <Pagination.First onClick={() => setCurrentPage(1)} />
              {pages.map((page, index) => {
                return (
                  <Pagination.Item
                    key={index}
                    active={page === currentPage}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Pagination.Item>
                );
              })}
              <Pagination.Last onClick={() => setCurrentPage(pages.length)} />
            </Pagination>
          </div> : ""
        }
      </div>
    </>
  );
}
