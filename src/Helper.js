const AddToCart = (product) => {
  var cart = localStorage.getItem("cart");
  cart = cart ? JSON.parse(cart) : [];

  // Check if product already exists in cart based on some unique identifier
  // Assuming each product has a unique id
  const productExists = cart.some((item) => item.id === product.id);

  // Only add the product if it doesn't already exist in the cart
  if (!productExists) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    return true; // Successfully added
  } else {
    // Product already in cart
    alert("This item is already in your cart");
    return false; // Not added because it already exists
  }
};
const GetCart = () => {
  var cart = localStorage.getItem("cart");
  cart = cart ? JSON.parse(cart) : [];

  return cart;
};

const RemoveCart = (id) => {
  var cart = localStorage.getItem("cart");
  cart = cart ? JSON.parse(cart) : [];

  cart = cart.filter((item) => item.id != id);
  localStorage.setItem("cart", JSON.stringify(cart));
};

const PriceCart = () => {
  var cart = localStorage.getItem("cart");
  cart = cart ? JSON.parse(cart) : [];

  var price = 0;
  cart = cart.map((item) => (price += Number(item.price)));
  return price;
};

export { AddToCart, RemoveCart, GetCart, PriceCart };
