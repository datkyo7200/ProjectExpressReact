import React, { useState, useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const LoginForm = () => {
    //Context
    const { loginUser } = useContext(AuthContext);

    const [loginForm, setLoginForm] = useState({
        username: "",
        password: "",
    });

    const onChangeLoginForm = (e) =>
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value });

    const { username, password } = loginForm;

    const login = async (e) => {
        e.preventDefautl();
        try {
            const loginData = await loginUser(loginForm);
            console.log(loginData);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Form className="my-4" onSubmit={login}>
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
