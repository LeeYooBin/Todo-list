import React from 'react';
import PropTypes from 'prop-types';
import style from "./add-task-button.module.css";
import { AiOutlinePlus } from 'react-icons/ai';

const AddTaskButton = ({ action }) => (
  <button 
    className={style.button}
    onClick={action}
  >
    <span className={style.icon}><AiOutlinePlus /></span>
    <p className={style.text}>Add task</p>
  </button>
);

AddTaskButton.propTypes = {
  action: PropTypes.func.isRequired,
};

export default AddTaskButton;