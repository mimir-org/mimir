import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store/index";
import { UserState } from "../../../redux/store/user/types";
import { ProjectState } from "../../../redux/store/project/types";
import { save } from "../../../redux/store/project/actions";
import { OpenProjectComponent } from "../../project/openProjectComponent";
import { MenuBox, MenuElement, MenuTopHeader } from "../../../componentLibrary";
import { GetMenuElement } from "./helpers";
import { TextResources } from "../../../assets/textResources";
import { MenuButton } from "../../../componentLibrary/buttons/";
import { UserIconOpen, LogoutIcon } from "../../../assets/icons";

const AccountMenu = () => {
  const dispatch = useDispatch();
  const [showAccountSettings, setshowAccountSettings] = useState(false);
  const [openProjectModule, setOpenProjectModule] = useState(false);
  const [createProjectModule, setCreateProjectModule] = useState(false);

  const projectState = useSelector<RootState>(
    (state) => state.projectState
  ) as ProjectState;

  const userState = useSelector<RootState>(
    (state) => state.userState
  ) as UserState;

  const handleClick = (e) => {
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
      </MenuTopHeader>
      {isOpen && (
        <MenuBox>
          {GetMenuElement("Open", handleOpenClick)}
          {GetMenuElement("Create", handleCreateClick)}
          {GetMenuElement("Save", handleSaveClick)}
          {userState.user && userState.user.name}
          <MenuButton>
            <img src={LogoutIcon} alt="logout" />
            {TextResources.Account_Logout}
          </MenuButton>
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
