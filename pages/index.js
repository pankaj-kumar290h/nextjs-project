import { useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import { useRouter } from "next/router";
export default function Home() {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);

  ////////if there is user in localStorage then redirect to main else to signin page///////////////

  useEffect(() => {
    let { username=null, _id=null } = JSON.parse(localStorage.getItem("user"));
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
    if (!username) {
      router.push("/signin");
    } else {
      router.push(`/main`);
    }
  }, []);

  return <h1>Welcome...</h1>;
}
