import "../styles/globals.css";
import UserContext from "../context/UserContext";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  /////////////// for useContex hook///////
  const [user, setUser] = useState({
    username: "",
    _id: "",
    token: "",
    email: "",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
