// Libraries
import React from "react";
// CSS
import classes from "./Logo.module.css";
// Images
import BurgerLogo from "../../assets/images/burger-logo.png";

const Logo = props => {
  return (
    <div className={classes.Logo}>
      <img src={BurgerLogo} alt="Burger Logo" />
    </div>
  );
};

export default Logo;
