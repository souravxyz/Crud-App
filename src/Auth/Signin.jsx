import React from "react";
import { Form, Button } from "react-bootstrap";
import "./signin.css";
import { useForm } from "react-hook-form";
import BackgroundImage from "../assets/images/background.png";
import Logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { useUserSignInMutation } from "../hooks/react-query/query-hooks/authQuery.hooks";

const Signin = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { mutate } = useUserSignInMutation();

  const onSubmit = (data) => mutate(data);

  return (
    <div className="signin__wrapper">
      <div className="signin__background">
        <Form
          className="signin__form shadow p-4 bg-white rounded"
          onSubmit={handleSubmit(onSubmit)}
        >
          <img className="signin__logo mb-4" src={Logo} alt="logo" />
          <div className="signin__title h4 mb-3 text-center">Sign In</div>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              required
              {...register("email", { required: "Email is required" })}
              className={`signin__input ${errors.email ? "is-invalid" : ""}`}
            />
            {errors.email && (
              <div className="signin__error">{errors.email.message}</div>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              {...register("password", { required: "Password is required" })}
              className={`signin__input ${errors.password ? "is-invalid" : ""}`}
            />
            {errors.password && (
              <div className="signin__error">{errors.password.message}</div>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="checkbox">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>
          <Button
            className="signin__button w-100"
            variant="primary"
            type="submit"
          >
            Log In
          </Button>
          <div className="text-center mt-3">
            <Button
              className="signin__link"
              variant="link"
              onClick={() => navigate("/signup")}
            >
              Create an Account
            </Button>
          </div>
        </Form>
        <div className="signin__footer">
          Made by Webskitters Academy | &copy; 2024
        </div>
      </div>
    </div>
  );
};

export default Signin;
