import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import style from "./form.module.css";
import { useTask } from '../../contexts/tasks-context';
import { AiOutlineClose } from 'react-icons/ai';
import { IoSend } from 'react-icons/io5';

const Form = ({ closeAction, task }) => {
  const titleInputRef = useRef(null);
  const textareaRef = useRef(null);
  const dateInputRef = useRef(null);

  const { addTask, editTask } = useTask();

  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = titleInputRef.current?.value;
    const description = textareaRef.current?.value;
    const date = dateInputRef.current?.value;
    let utcDate;

    if (date) {
      const utcDateString = `${date}T00:00:00`;
      utcDate = new Date(utcDateString);
    }

    if (title) {
      if (task) {
        const updatedTask = {
          ...task
        };
        updatedTask.title = title;
        if (description) updatedTask.description = description;
        if (utcDate && !isNaN(utcDate.getTime())) updatedTask.date = utcDate;
        editTask(task.id, updatedTask);
      }
      else {
        const newTask = {
          isChecked: false,
          title,
          description,
        };
        if (utcDate && !isNaN(utcDate.getTime())) newTask.date = utcDate;
        addTask(newTask);
      }
    }
    closeAction();
  };

  return (
    <form 
      className={style.form}
      onSubmit={handleSubmit}
    >
      <input 
        type="text" 
        placeholder="Task Name" 
        className={style.title_input}
        ref={titleInputRef}
        defaultValue={task?.title || ""}
      />
      <textarea
        maxLength={20}
        ref={textareaRef}
        className={style.description_input}
        placeholder="Description"
        defaultValue={task?.description || ""}
      />  
      <input 
        type="date" 
        className={style.date_input}
        ref={dateInputRef}
        defaultValue={task?.date ? task.date.toISOString().split('T')[0] : ""}
      />
      <div className={style.button_wrapper}>
        <button 
          type="button"
          className={style.close_button}
          onClick={closeAction}
        >
          <AiOutlineClose />
        </button>
        <button 
          type="submit"
          className={style.send_button}
        >
          <IoSend />
        </button>
      </div>
    </form>
  );
}

Form.propTypes = {
  closeAction: PropTypes.func.isRequired,
  task: PropTypes.shape({
    id: PropTypes.string,
    isChecked: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.instanceOf(Date),
  }),
};

export default Form;
