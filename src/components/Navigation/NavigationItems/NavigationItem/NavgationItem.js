// Libraries
import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
// CSS
import classes from "./NavigationItem.module.css";

const NavigationItem = props => {
  const { children, link, exact } = props;
  return (
    <li className={classes.NavigationItem}>
      <NavLink to={link} exact={exact} activeClassName={classes.active}>
        {children}
      </NavLink>
    </li>
  );
};

NavigationItem.propTypes = {
  children: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  exact: PropTypes.bool
};

NavigationItem.defaultProps = {
  exact: false
};

export default NavigationItem;
