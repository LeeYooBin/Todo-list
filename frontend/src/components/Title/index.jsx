import React from 'react';
import PropTypes from 'prop-types';
import style from "./title.module.css";

const Title = ({ children }) => (
  <h1 className={style.title}>{children}</h1>
);

Title.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Title;