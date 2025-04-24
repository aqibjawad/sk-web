// Action Types
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';

// Action Creators
export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});

export const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

// Reducer
const initialState = {
  products: [],
  cartItems: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      // Add logic to update cartItems with the new item
      return newState;

    case REMOVE_FROM_CART:
      // Add logic to remove item from cartItems
      return newState;

    case FETCH_PRODUCTS_SUCCESS:
      return { ...state, products: action.payload };

    default:
      return state;
  }
};

export default cartReducer;
