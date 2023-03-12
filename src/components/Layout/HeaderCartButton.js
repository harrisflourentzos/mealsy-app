import { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const [isButtonAnimating, setIsButtonAnimating] = useState(false);

  const numberOfItems = cartCtx.items.reduce(
    (cur, item) => cur + item.amount,
    0
  );

  const { items } = cartCtx;
  useEffect(() => {
    if (items.length === 0) return;
    setIsButtonAnimating(true);

    const timer = setTimeout(() => {
      setIsButtonAnimating(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  const btnClasses = `${classes.button} ${
    isButtonAnimating ? classes.bump : ""
  }`;

  return (
    <button onClick={props.onShowCart} className={btnClasses}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfItems}</span>
    </button>
  );
};

export default HeaderCartButton;
