export const initialState = {
  Cart: [],
};

export const getCartTotal = (Cart) => {
  Cart?.reduce((amount, item) => item.price + amount, 0);
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_Cart":
      return {
        ...state,
        Cart: [...state.Cart, action.item],
      };
    default:
      return state;
  }
};

export default reducer;
