import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

const Confirmation = () => {
  const username = useSelector((state) => state.auth.me.username);

  return (
    <div className="confirmation">
      <p className="confirmation-message">
        Thank you for buying from us {username}, an email confirmation has been
        sent to you.
      </p>
      <nav className="confirmation-nav">
        <NavLink to="/home">
          <button>Home</button>
        </NavLink>
      </nav>
    </div>
  );
};

export default Confirmation;
