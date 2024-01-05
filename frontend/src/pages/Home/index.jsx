import style from "./home.module.css";
import Header from "../../components/Header";
import { TaskProvider } from "../../contexts/tasks-context";
import Inbox from "../Inbox";

const Home = () => {
  return (
    <TaskProvider>
      <div className={style.content}>
        <Header />
        <Inbox />
      </div>
    </TaskProvider>
  );
}

export default Home;
