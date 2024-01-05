import React, { useState } from "react";
import PropTypes from 'prop-types';
import style from "./task.module.css";
import { useTask } from "../../contexts/tasks-context";
import Form from "../Form";
import CompleteTask from "../CompleteTask";
import { GoCircle, GoCheckCircleFill } from 'react-icons/go';
import { AiTwotoneEdit, AiFillDelete } from 'react-icons/ai';

const TaskView = ({
  id,
  isChecked, 
  title,
  description,
  date
}) => {
  const [showCompleteTask, setShowCompleteTask] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { removeTask, checkTask } = useTask();

  return (
    <div className={style.task}>
      {!isEditing ? (
        <>
          <div className={style.left_wrapper}>
            <button 
              type="button"
              className={style.check_button}
              onClick={() => checkTask(id)}
            >
              <span className={style.icon}>
                {isChecked ? <GoCheckCircleFill /> : <GoCircle />}
              </span>
            </button>
            <button
              type="button"
              className={style.task_button}
              onClick={() => setShowCompleteTask(true)}
            >
              <div className={style.text_wrapper}>
                <p className={isChecked ? style.task_title_checked : style.task_title}>
                  {title}
                </p>
                {date && (
                  <p className={style.date}>
                    {new Date(date).toLocaleDateString()}
                  </p>
                )}
              </div>
            </button>
          </div>
          <div className={style.button_wrapper}>
            <button 
              type="button"
              className={style.edit_button}
              onClick={() => setIsEditing(true)}
            >
              <AiTwotoneEdit />  
            </button>
            <button 
              type="button"
              className={style.delete_button}
              onClick={() => removeTask(id)}
            >
              <AiFillDelete />
            </button>
          </div>
        </>
      ) : 
      <Form 
        closeAction={() => setIsEditing(false)}
        task={{id, isChecked, title, description, date}}
      />}
      {!!showCompleteTask && (
        <CompleteTask
          title={title}
          description={description}
          date={date}
          closeAction={() => setShowCompleteTask(false)}
        />
      )}
    </div>
  );
};

TaskView.propTypes = {
  id: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  date: PropTypes.instanceOf(Date),
};

export default TaskView;
