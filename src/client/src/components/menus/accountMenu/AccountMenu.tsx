import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store/index";
import { UserState } from "../../../redux/store/user/types";
import { ProjectState } from "../../../redux/store/project/types";
import { save } from "../../../redux/store/project/actions";
import GetIcon from "./helpers/GetIcon";
import Button from "./helpers/Button";
import textResources from "../../../textResources";
import { OpenProjectComponent } from "../../project/openProjectComponent";
import { MenuBox, MenuHeader } from "../../../componentLibrary";

const AccountMenu = () => {
  const dispatch = useDispatch();
  const [showAccountSettings, setshowAccountSettings] = useState(false);
  const [openProjectModule, setOpenProjectModule] = useState(false);

  const projectState = useSelector<RootState>(
    (state) => state.projectState
  ) as ProjectState;

  const userState = useSelector<RootState>(
    (state) => state.userState
  ) as UserState;

  const handleClick = (e) => {
    setshowAccountSettings(!showAccountSettings);
  };

  const handleLoadClick = () => {
    setOpenProjectModule(!openProjectModule);
  };

  const handleSaveClick = (e) => {
    if (projectState.project) dispatch(save(projectState.project));
    alert("Project saved");
  };

  const isOpen = showAccountSettings;

  return (
    <>
      <MenuHeader isOpen={isOpen}>
        <div onClick={handleClick}>
          {projectState.project && projectState.project.name}
        </div>
      </MenuHeader>
      {isOpen && (
        <MenuBox>
          <div className="save_container">
            <GetIcon icon={"OpenIcon"} />
            {textResources.Account_Open_Label}
          </div>
          <div className="save_container">
            <GetIcon icon={"CreateIcon"} />
            {textResources.Account_Create_Label}
          </div>
          <div className="save_container">
            <GetIcon icon={"SaveIcon"} />
            {textResources.Account_Save_Label}
          </div>
          <div className="user_container">
            <p>{userState.user && userState.user.name}</p>
            <Button icon="LogoutIcon" text={textResources.Account_Logout} />
          </div>
        </MenuBox>
      )}
      {openProjectModule && isOpen && (
        <div className="open_project" style={{ zIndex: 100 }}>
          <OpenProjectComponent />
        </div>
      )}
    </>
  );
};

export default AccountMenu;
