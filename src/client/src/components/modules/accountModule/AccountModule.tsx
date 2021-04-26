import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store/index";
import { Project } from "../../../models/project";
import {
  loadStateFromStorage,
  saveStateToStorage,
} from "../../../redux/store/localStorage/localStorage";
import { save } from "../../../redux/store/project/actions";
import { getUser } from "../../../redux/store/user/actions";

import GetImg from "./helpers/GetImg";
import Button from "./helpers/Button";
import textResources from "../../../textResources";

const AccountModule = () => {
  const [showAccountSettings, setshowAccountSettings] = useState(
    // loadStateFromStorage("account")
    false
  );
  const handleClick = (e) => {
    setshowAccountSettings(!showAccountSettings);
    // const key = e.target.alt;
    // saveStateToStorage(!showAccount, key);
  };
  //   const isOpen = loadStateFromStorage("account");
  const isOpen = showAccountSettings;

  const dispatch = useDispatch();
  const project = useSelector<RootState>(
    (state) => state.projectState.project
  ) as Project;

  const handleSave = () => {
    if (project) dispatch(save(project));
  };

  const userDetails = () => {};

  return (
    <div className={"account_container " + (isOpen && "is_opened")}>
      <div className="account_clickable" onClick={handleClick}>
        {isOpen ? <GetImg icon="UserIconOpen" /> : <GetImg icon="" />}
        <p className={"project_name " + (isOpen && "project_name_opened")}>
          noaka
        </p>
      </div>
      {isOpen && (
        <div className="account_details">
          <div className="save_container">
            <p>{textResources.Account_Save_Label}</p>
            <Button
              icon="SaveIcon"
              text={textResources.Account_Save_Button}
              onclick={handleSave}
            />
          </div>
          <div className="user_container">
            <p>User Usersen</p>
            <Button icon="LogoutIcon" text={textResources.Account_Logout} />
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountModule;
