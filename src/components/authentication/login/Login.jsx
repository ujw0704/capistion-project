import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginContext } from "../../../context/login.context";
import { login } from "../../../services";
import { useMutation } from "@tanstack/react-query";
import { Box, Button, TextField, Typography } from "@mui/material";
import {
  FormBox,
  LoginCardContainer,
  LoginContainer,
  LoginPaper,
} from "./Login.styled";

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
      <LoginContainer>
        {/* Login Card Container */}
        <LoginCardContainer>
          {/* Paper Box for Login form */}
          <Box>
            <LoginPaper square elevation={3}>
              {/* Login Header */}
              <Typography variant="span" component="h2">
                Login
              </Typography>

              {/* Form Inputs */}
              <FormBox component="form" onSubmit={handleLogin}>
                <TextField
                  id="filled-multiline-flexible"
                  name="username"
                  label="Username"
                  variant="filled"
                  fullWidth
                  value={username}
                  onChange={handleChange}
                />
                <TextField
                  id="filled-multiline-flexible"
                  label="Password"
                  name="password"
                  type="password"
                  variant="filled"
                  fullWidth
                  value={password}
                  onChange={handleChange}
                />
                <Button variant="contained" onClick={handleLogin}>
                  Login
                </Button>
                <Button
                  sx={{
                    "&:hover": {
                      background: "none",
                    },
                  }}
                  variant="text"
                  color="primary"
                  onClick={() => navigate("/register")}
                >
                  Don't have an account? Register here!
                </Button>
              </FormBox>
            </LoginPaper>
          </Box>
        </LoginCardContainer>
      </LoginContainer>
    </>
  );
};
