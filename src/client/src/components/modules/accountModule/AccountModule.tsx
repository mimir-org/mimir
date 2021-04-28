import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/index";
import { UserState } from "../../../redux/store/user/types";
import { ProjectState } from "../../../redux/store/project/types";

import GetImg from "./helpers/GetImg";
import Button from "./helpers/Button";
import textResources from "../../../textResources";

const AccountModule = () => {
  const [showAccountSettings, setshowAccountSettings] = useState(false);

  const projectState = useSelector<RootState>(
    (state) => state.projectState
  ) as ProjectState;

  const userState = useSelector<RootState>(
    (state) => state.userState
  ) as UserState;

  const handleClick = (e) => {
    setshowAccountSettings(!showAccountSettings);
  };

  const isOpen = showAccountSettings;

  return (
    <div className="account_container">
      <div
        className={"account_clickable " + (isOpen && "is_opened")}
        onClick={handleClick}
      >
        {isOpen ? <GetImg icon="UserIconOpen" /> : <GetImg icon="" />}
        <p className={"project_name " + (isOpen && "project_name_opened")}>
          {projectState.project && projectState.project.name}
        </p>
      </div>
      {isOpen && (
        <div className="account_details">
          <div className="save_container">
            <p>{textResources.Account_Save_Label}</p>
            <Button icon="SaveIcon" text={textResources.Account_Save_Button} />
          </div>
          <div className="user_container">
            <p>{userState.user && userState.user.name}</p>
            <Button icon="LogoutIcon" text={textResources.Account_Logout} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountModule;
