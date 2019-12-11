// Libraries
import React from "react";
import PropTypes from "prop-types";
// CSS
import classes from "./NavigationItems.module.css";
// Components
import NavigationItem from "./NavigationItem/NavgationItem";

const NavigationItems = props => {
  const { isAuthenticated } = props;
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" exact>
        Burger Builder
      </NavigationItem>
      <NavigationItem link="/orders">Orders</NavigationItem>
      {isAuthenticated ? (
        <NavigationItem link="/logout">Logout</NavigationItem>
      ) : (
        <NavigationItem link="/auth">Authenticate</NavigationItem>
      )}
    </ul>
  );
};

NavigationItems.propTypes = { isAuthenticated: PropTypes.bool };

NavigationItems.defaultProps = { isAuthenticated: false };

export default NavigationItems;
