import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store/index";
import { UserState } from "../../../redux/store/user/types";
import { ProjectState } from "../../../redux/store/project/types";
import { create, save } from "../../../redux/store/project/actions";
import { GetMenuElement } from "./helpers";
import { GetMenuIcon } from "../../../assets/helpers";
import { MENU_TYPE } from "../../../models/project";
import { MenuBox, MenuTopHeader } from "../../../componentLibrary/box/menus";
import { changeProjectMenu } from "../../../redux/store/projectMenu/actions";
import { OpenProjectMenu } from "../../project/openProject";

const AccountMenu = () => {
  const dispatch = useDispatch();
  const type = MENU_TYPE.ACCOUNT;

  const isOpen = useSelector<RootState>(
    (state) => state.projectMenu.menu[1].visible
  ) as boolean;

  const projectState = useSelector<RootState>(
    (state) => state.projectState
  ) as ProjectState;

  const userState = useSelector<RootState>(
    (state) => state.userState
  ) as UserState;

  const handleAccountClick = () => {
    dispatch(changeProjectMenu("accountMenu", !isOpen));
  };

  const handleOpenClick = () => {
    dispatch(changeProjectMenu("openProjectMenu", true));
  };

  const handleCreateClick = () => {
    alert("Project created");
    dispatch(create("unnamed", "unnamed"));
    dispatch(changeProjectMenu("accountMenu", false));
  };

  const handleSaveClick = () => {
    if (projectState.project) dispatch(save(projectState.project));
    dispatch(changeProjectMenu("accountMenu", false));
    alert("Project saved");
  };

  return (
    <>
      <MenuTopHeader isOpen={isOpen}>
        <div onClick={handleAccountClick}>
          {projectState.project && projectState.project.name}
        </div>
        <img
          src={GetMenuIcon(isOpen, type)}
          alt="icon"
          className="icon"
          onClick={handleAccountClick}
        />
      </MenuTopHeader>
      {isOpen && (
        <MenuBox>
          <GetMenuElement type="Open" onClick={handleOpenClick} />
          <GetMenuElement type="Create" onClick={handleCreateClick} />
          <GetMenuElement type="Save" onClick={handleSaveClick} />
          <GetMenuElement type="Logout" userState={userState} />
        </MenuBox>
      )}
      <div style={{ zIndex: 100 }}>
        <OpenProjectMenu />
      </div>
    </>
  );
};

export default AccountMenu;
