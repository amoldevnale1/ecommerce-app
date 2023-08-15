const INIT_STATE = {
  carts: [],
  loader: false,
};

export const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "ADD_CART":
      return {
        carts: [...action.payload],
      };
  
    case "LOADER":
      return {
        carts: state.carts,
        loader: action.payload,
      };

    case "RMV_CART" :
      const data = state.carts.filter((prod) => prod.id !== action.payload);
      return {
        carts: data,
        loader: state.loader,
      }

    default:
      return state;
  }
};
