import { useState } from "react";
import style from "../styles/form.module.css";
import taskPage from "../styles/taskPage.module.css";
import Link from "next/link";
import { useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import { useRouter } from "next/router";
export default function Home() {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  console.log(user);

  useEffect(() => {
    if (!user.username) {
      console.log(user);
      router.push("/signin");
    }
  }, []);

  const [addTask, setAddTask] = useState("");
  const [taskList, setTaskList] = useState(["take a dog to walk"]);
  const handleAddTask = (event) => {
    setAddTask(event.target.value);
  };
  const handleAddTaskList = (event) => {
    event.preventDefault();
    if (addTask !== "") {
      setTaskList([...taskList, addTask]);
      setAddTask("");
    }
  };
  const date = new Date();
  return (
    <div className={style.container}>
      <section className={style.section}>
        <div className={style.form}>
          <div className={style.text_section}>
            <h3>Hello</h3>
            <h2>{user.username}</h2>
            <p>Good to see you hear!</p>
          </div>
          <div className={taskPage.task}>
            <h2>{`Task for the ${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`}</h2>
            <div className={taskPage.showTaskList}>
              <ul>
                {taskList.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            </div>
          </div>
          <form>
            <input
              disabled={taskList.length >= 5 ? true : false}
              placeholder={
                taskList.length < 5
                  ? "Enter Task Hear"
                  : "Can not add more then 5 task"
              }
              onChange={handleAddTask}
              value={addTask}
              className={taskPage.input}
            />
            <button onClick={handleAddTaskList} className={taskPage.button}>
              Add New Task
            </button>
          </form>
          <Link
            onClick={() => {
              setUser({ username: null });
            }}
            className={taskPage.link}
            href="/signin"
          >
            <h3>Logout</h3>
          </Link>
        </div>
      </section>
    </div>
  );
}
