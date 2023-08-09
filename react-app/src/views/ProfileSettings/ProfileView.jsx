import React, { useEffect, useState } from "react";
import ProfileSettings from "./ProfileSettings";
import PersonalInformation from "./PersonalInformation";
import ChangePassword from "./ChangePassword";
// import CompanyInformation from "../PostAd/CompanyInformation";
import DeleteAccount from "./DeleteAccount";
import CompanyInformationSettings from "./CompanyInformation";
import { useDispatch, useSelector } from "react-redux";
import { handleProfileSettingsCurrentView } from "../redux/TabNavigation/TabNavigationSlice";
// import PersonalInformation from "./PersonalInformation";

function ProfileView() {
  // const [currentView, setCurrentView] = useState("profileSettings");
  const dispatch = useDispatch();

  const profileSettingsCurrentView = useSelector(
    (state) => state.tabNavigation.profileSettingsCurrentView
  );
  useEffect(() => {
    console.log(
      "========================================================================================"
    );
    dispatch(handleProfileSettingsCurrentView("profileSettings"));
  }, []);

  // handleProfileSettingsCurrentView
  return (
    <>
      {profileSettingsCurrentView === "profileSettings" && <ProfileSettings />}
      {profileSettingsCurrentView === "PersonalInformation" && (
        <PersonalInformation />
      )}
      {profileSettingsCurrentView === "ChangePassword" && <ChangePassword />}
      {profileSettingsCurrentView === "CompanyInformation" && (
        <CompanyInformationSettings />
      )}
      {profileSettingsCurrentView === "DeleteAccount" && <DeleteAccount />}
    </>
  );
}

export default ProfileView;
