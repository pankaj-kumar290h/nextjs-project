import style from "../styles/form.module.css";
import image from "../styles/small.png";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import extra from "../styles/extra.module.css";

import { useContext, useState } from "react";
import { FaCircleNotch } from "react-icons/fa";
import UserContext from "../context/UserContext";

import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

function signup() {
  const user = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setShowconfiemPassword] = useState(false);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setdata] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    error: false,
  });
  const router = useRouter();

  ////handle form data
  const handleData = (name) => (event) => {
    setdata({ ...data, [name]: event.target.value });
  };

  //////////on submit form
  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      data.email === "" ||
      data.username === "" ||
      data.password === "" ||
      data.confirmPassword === ""
    ) {
      setError(true);
      return;
    }
    if (data.password !== data.confirmPassword) {
      setError(true);
      return;
    }
    setError(false);
    setloading(true);
    axios.post("http://localhost:5000/signin", { data }).then((res) => {
      console.log(res);
      user.setUser({ username: data.username });
      setloading(false);
      router.push("/");
    });
  };

  //////////show password
  const handleShow = () => {
    setShowPassword(!showPassword);
  };

  //////////show confirm password
  const handleConfirmShow = () => {
    setShowconfiemPassword(!showconfirmPassword);
  };
  return (
    <div className={style.container}>
      <section className={style.section}>
        <div className={style.form}>
          <div className={style.text_section}>
            <h3>Welcome !</h3>
            <h2>Sign Up to</h2>
            <p>lorem ipsume is simple</p>
          </div>
          <form>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type={"email"}
              placeholder="Enter your Email"
              onChange={handleData("email")}
            />
            <label htmlFor="usename">User Name</label>
            <input
              id="username"
              type={"text"}
              placeholder="Enter your user name"
              onChange={handleData("username")}
            />

            <label htmlFor="password">Password</label>
            <div className={style.password_input}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your Password"
                onChange={handleData("password")}
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
            <label htmlFor="confirmpassword">Confirm Password</label>
            <div className={style.password_input}>
              <input
                id="confirmpassword"
                type={showconfirmPassword ? "text" : "password"}
                placeholder="Confirm your Password"
                onChange={handleData("confirmPassword")}
              />

              {showconfirmPassword ? (
                <AiFillEye onClick={handleConfirmShow} className={style.icon} />
              ) : (
                <AiFillEyeInvisible
                  onClick={handleConfirmShow}
                  className={style.icon}
                />
              )}
            </div>

            <div>
              <input type={"checkbox"} />
              <label>Remember me</label>
            </div>
            {error && <p style={{ color: "red" }}>All field require</p>}
            {data.error && (
              <p style={{ color: "red" }}>Somethin went wrong plz try again.</p>
            )}
            <button onClick={handleSubmit}>
              {loading ? <FaCircleNotch className={extra.loding} /> : "Signup"}
            </button>
            <p className={style.foot_p}>
              Already have an Account?{" "}
              <Link className={style.foot_link} href={"/signin"}>
                Signin
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

export default signup;
