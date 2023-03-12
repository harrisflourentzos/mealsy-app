import React, { useContext } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";

const Cart = (props) => {
  const cartCxt = useContext(CartContext);
  const totalAmount = `$${cartCxt.totalAmount.toFixed(2)}`;

  const addItemHandler = (item) => {
    cartCxt.addItem({ ...item, amount: 1 });
  };
  const removeItemHandler = (id) => {
    cartCxt.removeItem(id);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCxt.items.map((item) => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onAdd={addItemHandler.bind(null, item)}
            onRemove={removeItemHandler.bind(null, item.id)}
          />
        );
      })}
    </ul>
  );

  return (
    <Modal onClick={props.onHideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Your Total amount: </span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHideCart}>
          Close
        </button>
        {cartCxt.items.length !== 0 && (
          <button className={classes.button}>Order</button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
