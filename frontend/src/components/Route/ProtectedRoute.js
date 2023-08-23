import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Route } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  return (
    <Fragment>
      {loading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated === false) {
              return navigate("/login")
            }

            if (isAdmin === true && user.role !== "admin") {
              return navigate("/login")
            }

            return <Component {...props} />;
          }}
        />
      )}
    </Fragment>
  );
};

export default ProtectedRoute;

/// Not working in the current React willl find a replacement once project finishes+