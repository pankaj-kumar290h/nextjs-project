import { useContext } from "react";
import UserContext from "./UserContext";
import axios from "axios";

export async function fetchData(id) {
  //   const { user, setUser } = useContext(UserContext);

  let response = await axios.get(
    `http://localhost:5000/api/getalltask?id=${id}`
  );

  let data = await response.then((result) => result.data.msg[0].todos);
  console.log(data);
  return data;
}
