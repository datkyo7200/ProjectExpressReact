import React, { useState, useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const LoginForm = () => {
  //Context
  const { loginUser } = useContext(AuthContext);

  //Router
  const history = useHistory();

  //Local State
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const onChangeLoginForm = (e) => {
    return setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const { username, password } = loginForm;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginData = await loginUser(loginForm);
      if (loginData.success) {
        history.push("/dashboard");
      }
      //   else {
      //     history.push("/login");
      //   }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Form className="my-4" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            value={username}
            onChange={onChangeLoginForm}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="password"
            value={password}
            onChange={onChangeLoginForm}
            required
          ></Form.Control>
        </Form.Group>
        <Button variant="success" type="submit">
          Login
        </Button>
      </Form>
      <p>
        Don't have an account?{" "}
        <Link to="/register">
          <Button varient="info" size="sm" className="ml-2">
            Register
          </Button>
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
