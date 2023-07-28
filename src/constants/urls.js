export const BASE_API = "https://api.chec.io/v1/";
export const PRODUCT_LIST_URL = `${BASE_API}products`;
export const CART_URL = `${BASE_API}carts/cart_DWy4oGdZ7K56Jx`;
export const GET_PRODUCT_DETAIL = `${BASE_API}products`;

export const getAllProductList = () => `${PRODUCT_LIST_URL}`;
export const addProductToCart = () => `${CART_URL}`;
export const getCartData = () => `${CART_URL}`;
export const getProductDetails = (productId) => `${GET_PRODUCT_DETAIL}/${productId}`;
