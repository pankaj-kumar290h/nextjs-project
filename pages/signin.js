import { useRouter } from "next/router";
import { useState } from "react";
import style from "../styles/form.module.css";
import image from "../styles/small.png";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { FaCircleNotch } from "react-icons/fa";
import extra from "../styles/extra.module.css";
import Link from "next/link";
import axios from "axios";
import { useContext } from "react";
import UserContext from "../context/UserContext";
function signin() {
  const user = useContext(UserContext);

  const router = useRouter();
  const [error, setError] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    loding: false,
    error: false,
  });

  ////////////handle form data

  const handlechange = (name) => (event) => {
    setUserInfo({ ...userInfo, [name]: event.target.value });
  };

  ///////////shandle show password
  const [showPassword, setShowPassword] = useState(false);
  const handleShow = () => {
    setShowPassword(!showPassword);
  };

  //////////handle submit botton
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userInfo.name == "" || userInfo.password === "") {
      setError(true);
      return;
    }
    setError(false);
    setUserInfo({ ...userInfo, loding: true });
    console.log(userInfo);

    axios.post("http://localhost:5000/signin", { userInfo }).then((res) => {
      setUserInfo({ ...userInfo, loding: false });

      console.log(res.data.userInfo);
      const { username } = res.data.userInfo;
      user.setUser({ username: username });
      router.push("/");
    });
  };
  return (
    <div className={style.container}>
      <section className={style.section}>
        <div className={style.form}>
          <div className={style.text_section}>
            <h3>Welcome !</h3>
            <h2>Sign in to</h2>
            <p>lorem ipsume is simple</p>
          </div>
          <form>
            <label htmlFor="usename">User Name</label>
            <input
              id="username"
              type={"text"}
              placeholder="Enter your user name"
              value={userInfo.name}
              onChange={handlechange("username")}
            />
            <label htmlFor="password">Password</label>

            <div className={style.password_input}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your Password"
                value={userInfo.password}
                onChange={handlechange("password")}
              />

              {showPassword ? (
                <AiFillEye onClick={handleShow} className={style.icon} />
              ) : (
                <AiFillEyeInvisible
                  onClick={handleShow}
                  className={style.icon}
                />
              )}
            </div>
            <div>
              <input type={"checkbox"} />
              <label>Remember me</label>
            </div>
            {error && <p style={{ color: "red" }}>All field require</p>}
            {userInfo.error && (
              <p style={{ color: "red" }}>
                Username or password is not correct
              </p>
            )}
            <button onClick={handleSubmit}>
              {userInfo.loding ? (
                <FaCircleNotch className={extra.loding} />
              ) : (
                "Login"
              )}
            </button>

            <p className={style.foot_p}>
              Don't have an Account?{" "}
              <Link className={style.foot_link} href={"/signup"}>
                Register
              </Link>
            </p>
          </form>
        </div>
      </section>
      <section className={style.image}>
        <img src={image.src} alt="image"></img>
      </section>
    </div>
  );
}

export default signin;
