import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

const Confirmation = () => {
  const username = useSelector((state) => state.auth.me.username);
  const email = useSelector((state) => state.auth.me.email);
  return (
    <div className="confirmation">
      <div class="card">
        <div class="header">
          <div class="image">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M20 7L9.00004 18L3.99994 13"
                  stroke="#000000"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </div>
          <div class="content">
            <span class="title">Order validated</span>
            <p class="message">
              Thank you for your purchase {username}. Your package will be
              delivered within 2 days of your purchase.
            </p>
            <p>Confirmation Email has been sent to {email}</p>
            <NavLink to="/home">
              <button>Home</button>
            </NavLink>
          </div>
          <div class="actions"></div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
