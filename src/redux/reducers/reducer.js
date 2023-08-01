const INIT_STATE = {
  carts: [],
  loader: false,
};

export const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "ADD_CART":
      return {
        carts: action.payload,
      };
  
    case "LOADER":
      return {
        carts: state.carts,
        loader: action.payload,
      };

    default:
      return state;
  }
};
