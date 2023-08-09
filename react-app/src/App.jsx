import React, { useEffect, useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Route, Routes } from "react-router-dom";
// import { useSelector } from "react-redux";
import "./App.css";
import Homepage from "./views/Homepage/Homepage";
import Login from "./views/Login/Login";
import PostAd from "./views/PostAd/PostAd";
import ProfileSettings from "./views/ProfileSettings/ProfileSettings";
import ProfileView from "./views/ProfileSettings/ProfileView";
import ProtectedRoute from "./views/ProtectedRoute";
import { getCookie } from "./utilities/utils";
import MyAds from "./views/Ads/MyAds";
import ViewAd from "./views/Ads/ViewAd";
import EditAd from "./views/EditAd/EditAd";
// import EditAd from "./views/EditAd/EditAd";
// import "../src/assets/scss/_buttons.scss"
function App() {
  // const [count, setCount] = useState(0)
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   // Check if the user has a valid access token
  //   const accessToken = localStorage.getItem("accessToken");
  //   if (accessToken) {
  //     // You can also check if the access token is expired here
  //     setIsAuthenticated(true);
  //   } else {
  //     setIsAuthenticated(false);
  //   }
  // }, []);

  // useEffect(() => {
  //   const refreshToken = getCookie("refresh_token")
  // }, [third])

  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      {/* <Route path="/post-ad" element={<PostAd />} /> */}
      {/* <ProtectedRoute
        path="/post-ad"
        component={PostAd}
      /> */}
      <Route
        path="/post-ad"
        element={
          <ProtectedRoute>
            <PostAd />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-ad/:id"
        element={
          <ProtectedRoute>
            <EditAd />
          </ProtectedRoute>
        }
      />
      {/* // isAuthenticated={isAuthenticated} */}
      <Route
        path="/profile-settings"
        element={
          <ProtectedRoute>
            <ProfileView />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-ads"
        element={
          <ProtectedRoute>
            <MyAds />
          </ProtectedRoute>
        }
      />
      <Route
        path="/view-ad/:adId"
        element={
          <ProtectedRoute>
            <ViewAd />
          </ProtectedRoute>
        }
      />
      {/* <Route path="/profile-settings" element={<ProfileView />} /> */}
      {/* <Route path="login" element={<Login />} /> */}
      {/* <Route index element={<Homepage />} /> */}
      {/* <Route path="dashboard" element={<Dashboard />} /> */}

      {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
      {/* <Route path="*" element={<NoMatch />} /> */}
      {/* </Route> */}
    </Routes>
  );
}

export default App;
