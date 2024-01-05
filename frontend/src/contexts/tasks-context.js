import { useState, createContext, useContext, useEffect } from "react";
import { useAuth } from "./auth-context";

export const TasksContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])

  const { token } = useAuth();

  const getTasks = async () => {
    const response = await fetch("http://localhost:8080/user/tasks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    const data = await response.json();
    setTasks(data);
  }

  useEffect(() => {
    getTasks();
  }, []);

  const checkTask = (taskId) => {
    getTasks();
  };

  const addTask = async (newTask) => {
    await fetch("http://localhost:8080/user/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(newTask)
    });
    getTasks();
  };

  const removeTask = async (taskId) => {
    await fetch(`http://localhost:8080/user/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    getTasks();
  };

  const editTask = async (taskId, updatedTask) => {
    await fetch(`http://localhost:8080/user/tasks/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(updatedTask)
    });
    getTasks();
  };

  return (
    <TasksContext.Provider
      value={{ tasks, addTask, removeTask, editTask, checkTask }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export const useTask = () => {
  return useContext(TasksContext);
};