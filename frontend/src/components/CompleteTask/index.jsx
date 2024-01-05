import style from "./complete-task.module.css";
import { AiOutlineClose } from 'react-icons/ai';

const CompleteTask = ({
  title,
  description,
  date,
  closeAction 
}) => (
  <div className={style.modal_screen}>
    <div className={style.modal}>
      <button 
        type="button"
        className={style.close_button}
        onClick={closeAction}
      >
        <AiOutlineClose />
      </button>
      <h2 className={style.title}>{title}</h2>
      {!!description && <p className={style.description}>{description}</p>}
      {!!date && <p className={style.date}>{new Date(date).toLocaleDateString()}</p>}
    </div>
  </div>
);

export default CompleteTask;