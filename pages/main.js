import { useState } from "react";
import style from "../styles/form.module.css";
import taskPage from "../styles/taskPage.module.css";
import Link from "next/link";
import { useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import { useRouter } from "next/router";
import axios from "axios";
import { BASE_API } from "../API";

export default function MainPage() {
  const router = useRouter();

  const { user, setUser } = useContext(UserContext);
  const [addTask, setAddTask] = useState("");

  const [taskList, setTaskList] = useState([]);

  //////////////fetching data for first render//////
  useEffect(() => {
    if (localStorage) {
      const { username, _id, token } = JSON.parse(localStorage.getItem("user"));
      setUser({ username, _id, token });

      if (!username) {
        router.push("/signin");
      } else {
        axios
          .get(`${BASE_API}/getalltask?id=${_id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((data) => {
            if (data.data.result?.todos.length) {
              setTaskList([...data.data.result.todos]);
            }
          });
      }
    }
  }, []);

  ///////////////making api call for adding list item//////
  useEffect(() => {
    const { username, _id, token } = JSON.parse(localStorage.getItem("user"));

    axios
      .post(
        `${BASE_API}/addtask?id=${_id}`,

        {
          user_id: user._id,
          todos: [...taskList],
        }
      )
      .catch((err) => console.log(err));
  }, [taskList]);

  const handleAddTask = (event) => {
    setAddTask(event.target.value);
  };
  const handleAddTaskList = async (event) => {
    event.preventDefault();
    if (addTask !== "") {
      setTaskList((pre) => [...pre, addTask]);
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
              style={{ background: taskList.length >= 5 ? "pink" : "white" }}
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
          {/*///////////// handling logout ///////////////////*/}
          <Link
            onClick={() => {
              setUser({ username: null });
              localStorage.clear();
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
