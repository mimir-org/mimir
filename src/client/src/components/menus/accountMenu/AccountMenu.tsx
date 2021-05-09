import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store/index";
import { UserState } from "../../../redux/store/user/types";
import { ProjectState } from "../../../redux/store/project/types";
import { save } from "../../../redux/store/project/actions";
import { OpenProjectComponent } from "../../project/openProjectComponent";
import { GetMenuElement } from "./helpers";
import { TextResources } from "../../../assets/textResources";
import { MenuButton } from "../../../componentLibrary/buttons/";
import { LogoutIcon } from "../../../assets/icons";
import { GetMenuBoxIcon } from "../../../assets/helpers";
import { MENU_TYPE } from "../../../models/project";
import {
  MenuBox,
  MenuTopHeader,
  MenuLogoutBox,
} from "../../../componentLibrary";

const AccountMenu = () => {
  const dispatch = useDispatch();
  const [showAccountSettings, setshowAccountSettings] = useState(false);
  const [openProjectModule, setOpenProjectModule] = useState(false);
  const [createProjectModule, setCreateProjectModule] = useState(false);
  const key = MENU_TYPE.ACCOUNT;

  const projectState = useSelector<RootState>(
    (state) => state.projectState
  ) as ProjectState;

  const userState = useSelector<RootState>(
    (state) => state.userState
  ) as UserState;

  const handleClick = () => {
    setshowAccountSettings(!showAccountSettings);
  };

  const handleOpenClick = () => {
    setOpenProjectModule(!openProjectModule);
  };

  const handleCreateClick = () => {
    setCreateProjectModule(!createProjectModule);
  };

  const handleSaveClick = () => {
    if (projectState.project) dispatch(save(projectState.project));
    alert("Project saved");
  };

  const isOpen = showAccountSettings;

  return (
    <>
      <MenuTopHeader isOpen={isOpen}>
        <div onClick={handleClick}>
          {projectState.project && projectState.project.name}
        </div>
        {GetMenuBoxIcon(isOpen, key, handleClick)}
      </MenuTopHeader>
      {isOpen && (
        <MenuBox>
          {GetMenuElement("Open", handleOpenClick)}
          {GetMenuElement("Create", handleCreateClick)}
          {GetMenuElement("Save", handleSaveClick)}
          <MenuLogoutBox>
            {userState.user && userState.user.name}
            <MenuButton>
              <img src={LogoutIcon} alt="logout" />
              {TextResources.Account_Logout}
            </MenuButton>
          </MenuLogoutBox>
        </MenuBox>
      )}
      {openProjectModule && isOpen && (
        <div style={{ zIndex: 100 }}>
          <OpenProjectComponent />
        </div>
      )}
    </>
  );
};

export default AccountMenu;
