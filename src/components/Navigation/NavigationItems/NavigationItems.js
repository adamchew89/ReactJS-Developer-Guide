// Libraries
import React from "react";
// CSS
import classes from "./NavigationItems.module.css";
// Components
import NavigationItem from "./NavigationItem/NavgationItem";

const NavigationItems = () => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" exact>
        Burger Builder
      </NavigationItem>
      <NavigationItem link="/orders">Orders</NavigationItem>
      <NavigationItem link="/auth">Authenticate</NavigationItem>
    </ul>
  );
};

NavigationItems.propTypes = {};

NavigationItems.defaultProps = {};

export default NavigationItems;
