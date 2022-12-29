import "../styles/globals.css";
import UserContext from "../context/UserContext";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState({
    username: "pankaj",
  });
  console.log(user);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
