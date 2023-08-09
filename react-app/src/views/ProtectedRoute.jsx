// components/ProtectedRoute.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Route, Redirect } from "react-router-dom";
// eslint-disable-next-line import/no-extraneous-dependencies
import CircularProgress from "@mui/material/CircularProgress";
import { getAuthenticatedUser, refreshToken } from "./redux/Auth/authSlice";
// import { isAccessTokenExpired } from "../utilities/common";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    // if (!user.accessToken || isAccessTokenExpired(user.accessToken)) {
    dispatch(refreshToken());
    // }
  }, [dispatch]);

  useEffect(() => {
    if (user.userId === null && user.accessToken !== null) {
      dispatch(getAuthenticatedUser());
    }
  }, [user, user.accessToken]);

  if (user?.accessToken) {
    // if (isTenantSubscribed) {
    return (
      children
    );
    // }
    // else {
    //   return <Redirect to="/subscription' />;
    // }
    // eslint-disable-next-line no-else-return
  }
  //  else {
  // console.log("logoooooooooooooooooooooooooooooooooooo");
  // return <Navigate replace={true} to="/" />;

  // setTimeout(() => {
  //   navigate("/", { replace: true });
  // }, 500);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
      }}
      className="d-flex justify-content-center align-items-center"
    >
      <CircularProgress
        style={{
          color: "#fa7b03",
          height: "50px",
          width: "50px",
        }}
      />
    </div>
  );
  // return (
  //   <div
  //     style={{
  //       height: "100vh",
  //       width: "100vw",
  //     }}
  //     className=" d-flex justify-content-center align-items-center"
  //   >
  //     <CircularProgress
  //       style={{
  //         color: "#fa7b03",
  //         height: "50px",
  //         width: "50px",
  //         // marginTop: "47vh",
  //       }}
  //     />
  //   </div>
  // );
};

export default ProtectedRoute;
