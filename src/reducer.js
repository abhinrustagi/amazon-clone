export const initialState = {
  Cart: [],
};

export const getCartTotal = (Cart) => {
  var sum = 0;
  Cart.forEach((item) => {
    sum += item.price;
  });
  return sum;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        Cart: [...state.Cart, action.item],
      };
    case "REMOVE_FROM_CART":
      const index = state.Cart.findIndex(
        (cartItem) => cartItem.id === action.id
      );
      let newCart = [...state.Cart];

      if (index >= 0) {
        newCart.splice(index, 1);
      } else {
        console.warn("Cannot remove  product. Not in Cart.");
      }

      return {
        ...state,
        Cart: newCart,
      };
    default:
      return state;
  }
};

export default reducer;
