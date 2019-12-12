// Libraries
import React from "react";
import PropTypes from "prop-types";
// CSS
import classes from "./NavigationItems.module.css";
// Components
import NavigationItem from "./NavigationItem/NavgationItem";

const NavigationItems = props => {
  const { isAuthenticated } = props;
  let content = <NavigationItem link="/auth">Authenticate</NavigationItem>;
  if (isAuthenticated) {
    content = (
      <>
        <NavigationItem link="/orders">Orders</NavigationItem>
        <NavigationItem link="/logout">Logout</NavigationItem>
      </>
    );
  }
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" exact>
        Burger Builder
      </NavigationItem>
      {content}
    </ul>
  );
};

NavigationItems.propTypes = { isAuthenticated: PropTypes.bool };

NavigationItems.defaultProps = { isAuthenticated: false };

export default NavigationItems;
