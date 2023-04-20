import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { authenticate } from "../../app/store";

/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    dispatch(authenticate({ username, password, method: formName }));
  };

  return (
    <div className="auth-form-container">
      <form className="auth-form" onSubmit={handleSubmit} name={name}>
        <div className="form-field">
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" />
        </div>
        <div className="form-field">
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div className="form-field">
          <button type="submit">{displayName}</button>
        </div>
        {error && <div className="error-message"> {error} </div>}
      </form>
    </div>
  );
};

export default AuthForm;
