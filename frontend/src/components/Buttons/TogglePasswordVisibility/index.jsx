import React from "react";
import PropTypes from "prop-types";
import style from "./toggle-visibility.module.css";
import eyeSlash from "../../../assets/eye-slash.svg";
import eye from "../../../assets/eye.svg";

const TogglePasswordVisibility = ({ action, type }) => (
  <button
    type="button"
    className={style.icon}
    onClick={action}
  >
    {
      type === "password" ?
      <img src={eyeSlash} alt="Eye slash icon" className={style.icon_img} />
      :
      <img src={eye} alt="Eye icon" className={style.icon_img} />
    }
  </button>
);

TogglePasswordVisibility.propTypes = {
  action: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

export default TogglePasswordVisibility;
