// Libraries
import React from "react";
import PropTypes from "prop-types";
// CSS
import classes from "./NavigationItem.module.css";

const NavigationItem = props => {
  const { children, link, active } = props;
  return (
    <li className={classes.NavigationItem}>
      <a href={link} className={active ? classes.active : null}>
        {children}
      </a>
    </li>
  );
};

NavigationItem.propTypes = {
  children: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  active: PropTypes.bool
};

NavigationItem.defaultProps = {
  active: false
};

export default NavigationItem;
