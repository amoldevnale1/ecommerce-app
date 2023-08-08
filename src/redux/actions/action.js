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

// remove product
export const REMOVE_CART = (id) => {
  return {
    type: 'RMV_CART',
    payload: id
  }
}

