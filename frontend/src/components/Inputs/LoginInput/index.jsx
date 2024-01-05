import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import style from "./login-input.module.css";

const LoginInput = forwardRef(({ type, placeholder, children }, ref) => {
  return (
    <label className={style.label}>
      {children && children}
      <input
        type={type}
        placeholder={placeholder}
        ref={ref}
        className={style.input}
      />
    </label>
  );
});

LoginInput.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default LoginInput;