import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store/index";
import { UserState } from "../../../redux/store/user/types";
import { ProjectState } from "../../../redux/store/project/types";
import { create, save } from "../../../redux/store/project/actions";
import { OpenProjectComponent } from "../../project/openProjectComponent";
import { GetMenuElement } from "./helpers";
import { GetMenuIcon } from "../../../assets/helpers";
import { MENU_TYPE } from "../../../models/project";
import { MenuBox, MenuTopHeader } from "../../../componentLibrary";

const AccountMenu = () => {
  const dispatch = useDispatch();
  const [showAccountSettings, setshowAccountSettings] = useState(false);
  const [openProjectModule, setOpenProjectModule] = useState(false);
  const type = MENU_TYPE.ACCOUNT;

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
    alert("Project created");
    dispatch(create("unnamed", "unnamed"));
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
        <img
          src={GetMenuIcon(isOpen, type)}
          alt="icon"
          className="icon"
          onClick={handleClick}
        />
      </MenuTopHeader>
      {isOpen && (
        <MenuBox>
          <GetMenuElement type="Open" onClick={handleOpenClick} />
          <GetMenuElement type="Create" onClick={handleCreateClick} />
          <GetMenuElement type="Save" onClick={handleSaveClick} />
          <GetMenuElement type="Logout" user={userState} />
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
