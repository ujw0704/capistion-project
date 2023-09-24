import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useLoginContext } from "../../../context/login.context";
import { login } from "../../../services";
import { useMutation } from "@tanstack/react-query";

export const Login = () => {
  const { setIsLoggedIn } = useLoginContext();
  const [formInputs, setFormInputs] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const { username, password } = formInputs;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInputs({
      ...formInputs,
      [name]: value,
    });
  };

  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: (result) => {
      const { status, username, accessToken } = result.data;
      if (status === "authenticated") {
        localStorage.setItem("username", username ?? "");
        localStorage.setItem("token", accessToken ?? "");
        setIsLoggedIn(true);
        navigate("/");
      } else {
        navigate("/sign");
      }
    },
    onError: (error) => {
      // Handle error logic here
      console.log(error);
    },
  });

  async function handleLogin(e) {
    e.preventDefault();
    try {
      await loginMutation.mutateAsync(formInputs);
    } catch (error) {
      // Any error handling logic can be done in the onError callback
      console.log(error);
    }
  }

  return (
    <>
      <div className="login">
        <div className="loginContent">
          <h1>Login</h1>

          <form onSubmit={handleLogin}>
            <label>Username </label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleChange}
              placeholder="Username"
              required
            ></input>
            <br />
            <label>Password </label>

            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Password"
              required
            ></input>
            <br />
            <button style={{ color: "white" }} type="submit" name="login">
              Login
            </button>
          </form>
          {/* <Link to="/register">Create account </Link>    */}
          <div>
            {" "}
            <Link to="/register" className="a">
              create
            </Link>{" "}
          </div>
        </div>
      </div>
    </>
  );
};
