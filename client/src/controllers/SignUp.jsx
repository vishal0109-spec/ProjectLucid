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
const SignUp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const handleInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const userSignupSubmit = async () => {
    const { firstName, lastName, email, phone, password, confirmPassword } =
      user;
    const response = await fetch(`${ServerApi}/api/auth/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        phone,
        password,
        confirmPassword,
      }),
      credentials: "include",
    });
    const data = await response.json();
    if (data.success === false) {
      toast.error(data.message, {
        autoClose: 2000,
      });
      if (data.message.length !==0||data.message.length!==null) {
        for (let messages of data.message) {
          toast.error(messages.message, {
            autoClose: 2000,
          });
        }
      }
    } else {
      if (data.success === true) {
        toast.success(data.message, {
          autoClose: 2000,
        });
        setUser({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
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
            Sign Up
          </Typography>
          <Item className="inputs">
            <Input
              type="text"
              placeholder="First Name"
              name="firstName"
              id="firstName"
              className="input"
              value={user.firstName}
              onChange={handleInput}
            ></Input>
          </Item>

          <Item className="inputs">
            <Input
              type="text"
              placeholder="Last Name"
              name="lastName"
              id="lastName"
              className="input"
              value={user.lastName}
              onChange={handleInput}
            ></Input>
          </Item>
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
              type="number"
              placeholder="Phone"
              name="phone"
              id="phone"
              className="input"
              value={user.phone}
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
          <Item className="inputs">
            <Input
              type="password"
              placeholder=" Confirm Password"
              name="confirmPassword"
              id="confirmPassword"
              className="input"
              value={user.confirmPassword}
              onChange={handleInput}
            ></Input>
          </Item>
          <Box sx={{ marginTop: "1rem" }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ width: "100%", fontSize: "1.2rem", display: "block" }}
              onClick={userSignupSubmit}
            >
              Submit
            </Button>
          </Box>
          <Typography
            variant="h5"
            color="initial"
            sx={{ textAlign: "center", marginTop: "1rem" }}
          >
            if you are already create Account <Link to={"/login"}>Login</Link>
          </Typography>
        </Div>
      </Box>
    </Container>
  );
};

export default SignUp;
