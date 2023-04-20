import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "./userSlice";
import { NavLink } from "react-router-dom";

const AllUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.list);
  const [loading, setLoading] = useState(true);

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
    <div className="all-users-container">
      {loading ? (
        <p>Loading...</p>
      ) : users && users.length > 0 ? (
        users.map((user) => (
          <div className="user row" key={`All users: ${user.id}`}>
            <NavLink to={`/users/${user.id}`}>
              <p className="username">{user.username}</p>
            </NavLink>
          </div>
        ))
      ) : (
        <p>No users to display</p>
      )}
    </div>
  );
};

export default AllUsers;
