import { useReducer } from "react";
import CartContext from "./cart-context";

const INITIAL_CART_STATE = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const existingItem = state.items.find(
      (item) => item.id === action.value.id
    );
    if (existingItem) {
      existingItem.amount += action.value.amount;

      return {
        items: [...state.items],
        totalAmount: state.items.reduce(
          (acc, item) => acc + item.amount * item.price,
          0
        ),
      };
    }

    return {
      items: state.items.concat(action.value),
      totalAmount: state.totalAmount + action.value.price * action.value.amount,
    };
  }

  if (action.type === "REMOVE") {
    const existingItem = state.items.find((item) => item.id === action.value);
    let updatedItems = [...state.items];

    if (existingItem.amount > 1) {
      existingItem.amount -= 1;
    } else {
      updatedItems = state.items.filter((item) => item.id !== existingItem.id);
    }

    return {
      items: updatedItems,
      totalAmount: updatedItems.reduce(
        (acc, item) => acc + item.amount * item.price,
        0
      ),
    };
  }

  return INITIAL_CART_STATE;
};

const CartProvider = (props) => {
  const [cartState, cartStateDispatcher] = useReducer(
    cartReducer,
    INITIAL_CART_STATE
  );
  const addItemToCartHandler = (item) => {
    cartStateDispatcher({ type: "ADD", value: item });
  };
  const removeItemFromCartHandler = (id) => {
    cartStateDispatcher({ type: "REMOVE", value: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
