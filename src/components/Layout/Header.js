import { Fragment } from "react";
import classes from "./Header.module.css";

import mealsImage from "../../assets/food.png";
import HeaderCartButton from "./HeaderCartButton";
import fruitIcon from "../../assets/fruit.png";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <div className={classes.logo}>
          <img src={fruitIcon} alt="fruitIcon"></img>
          <h1>Mealsy</h1>
        </div>
        <HeaderCartButton onShowCart={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="Some food" />
      </div>
    </Fragment>
  );
};

export default Header;
