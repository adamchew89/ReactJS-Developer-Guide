// Libraries
import React from "react";
// CSS
import classes from "./NavigationItems.module.css";
// Components
import NavigationItem from "./NavigationItem/NavgationItem";

const NavigationItems = () => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" active>
        Burger Builder
      </NavigationItem>
      <NavigationItem link="/">Checkout</NavigationItem>
    </ul>
  );
};

NavigationItems.propTypes = {};

NavigationItems.defaultProps = {};

export default NavigationItems;
