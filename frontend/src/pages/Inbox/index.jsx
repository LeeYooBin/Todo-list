import { useState } from "react";
import style from "./inbox.module.css";
import Title from "../../components/Title";
import AddTaskButton from "../../components/Buttons/AddTaskButton";
import Form from "../../components/Form";
import TaskView from "../../components/Task";
import { useTask } from "../../contexts/tasks-context";

const Inbox = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { tasks } = useTask();
  
  return (
    <main className={style.inbox}>
      <Title>Inbox</Title>
      <hr className={style.line} />
      <div className={style.tasks_box}>
        {tasks.length ? tasks.map(task => (
          <TaskView
            key={task.id}
            id={task.id}
            isChecked={task.isChecked}
            title={task.title}
            description={task.description}
            date={task.date}
          />
        )) : 
        <></>
        }
        {!isFormOpen ? 
          <AddTaskButton action={() => setIsFormOpen(true)} />
          :
          <Form 
            closeAction={() => setIsFormOpen(false)}
          />
        }
      </div>
    </main>
  );
}

export default Inbox;