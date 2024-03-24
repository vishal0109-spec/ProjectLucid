import { styled } from "styled-components";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import ServerApi from "../ServerApi/ServerApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .main-user-box {
    padding: 5rem;
    border: 1px solid #34343475;
    border-radius: 1rem;
    .main-item-box {
      display: flex;
      flex-direction: column;
      .inputs {
        height: 3rem;
        width: 40rem;
        border: 1px solid #34343475;
        margin-top: 1rem;

        .input {
          width: 100%;
          height: 100%;
          display: block;
          font-size: 1.5rem;
          padding: 1rem 2rem;
          outline: none;
          border: none;
          text-decoration: none;
          cursor: pointer;
        }
      }
    }
  }
`;
const Item = styled.div``;
const Div = styled.div``;
const Input = styled.input``;
const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const userSignInSubmit = async () => {
    const { email, password } = user;
    const response = await fetch(`${ServerApi}/api/auth/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,

        password,
      }),
      credentials: "include",
    });
    const data = await response.json();
    if (data.success === false) {
      toast.error(data.message, {
        autoClose: 2000,
      });
    } else {
      if (data.success === true) {
        toast.success(data.message, {
          autoClose: 2000,
        });
        setUser({
          email: "",
          password: "",
        });
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        toast.error("server error", {
          autoClose: 2000,
        });
      }
    }
  };
  return (
    <Container>
      <Box className="main-user-box">
        <Div className="main-item-box">
          <Typography
            variant="h3"
            color="initial"
            sx={{ textAlign: "center", marginBottom: "1rem" }}
          >
            Sign In
          </Typography>

          <Item className="inputs">
            <Input
              type="email"
              placeholder="Email"
              name="email"
              id="email"
              className="input"
              value={user.email}
              onChange={handleInput}
            ></Input>
          </Item>

          <Item className="inputs">
            <Input
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              className="input"
              value={user.password}
              onChange={handleInput}
            ></Input>
          </Item>

          <Box sx={{ marginTop: "1rem" }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ width: "100%", fontSize: "1.2rem", display: "block" }}
              onClick={userSignInSubmit}
            >
              Submit
            </Button>
          </Box>
          <Typography
            variant="h5"
            color="initial"
            sx={{ textAlign: "center", marginTop: "1rem" }}
          >
            create your Account <Link to={"/signup"}>Sign Up</Link>
          </Typography>
        </Div>
      </Box>
    </Container>
  );
};

export default Login;
