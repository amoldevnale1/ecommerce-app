// add to cart product
export const ADD_TO_CART = (product) => {
  return {
    type: "ADD_CART",
    payload: product
  };
};

// loader
export const SET_LOADER = (value) => {
  return {
    type: "LOADER",
    payload: value
  }
}
