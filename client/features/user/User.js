import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "./userSlice";
import { NavLink } from "react-router-dom";

const AllUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.list);
  const [loading, setLoading] = useState(true);
  const isAdmin = useSelector((state) => state.auth.me.isAdmin);
  const isLoggedIn = useSelector((state) => !!state.auth.me);

  useEffect(() => {
    dispatch(fetchUsers())
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [dispatch]);

  return (
    <div>
      {isLoggedIn && isAdmin ? (
        <div className="all-users-container">
          {loading ? (
            <p>Loading...</p>
          ) : users && users.length > 0 ? (
            users.map((user) => (
              <div className="user row" key={`All users: ${user.id}`}>
                <NavLink to={`/users/${user.id}`}>
                  <p className="username">{user.username}</p>
                </NavLink>
                <span>{user.isAdmin ? "Admin" : "Not an admin"}</span>
              </div>
            ))
          ) : (
            <p>No users to display</p>
          )}
        </div>
      ) : (
        <div>
          <p>NO ENTRY</p>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
