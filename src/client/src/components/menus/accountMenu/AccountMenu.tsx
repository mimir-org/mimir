import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store/index";
import { UserState } from "../../../redux/store/user/types";
import { ProjectState } from "../../../redux/store/project/types";
import { save } from "../../../redux/store/project/actions";
import { GetMenuElement } from "./helpers";
import { GetMenuIcon } from "../../../assets/helpers";
import { MENU_TYPE, PROJECT_MENU_TYPE } from "../../../models/project";
import { MenuBox, MenuTopHeader } from "../../../componentLibrary/box/menus";
import { changeProjectMenu } from "../../../redux/store/projectMenu/actions";
import { OpenProjectMenu } from "../../project/openProject";
import { CreateProjectMenu } from "../../project/createProject";

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
    dispatch(changeProjectMenu(PROJECT_MENU_TYPE.ACCOUNT_MENU, !isOpen));
  };

  const handleOpenClick = () => {
    dispatch(changeProjectMenu(PROJECT_MENU_TYPE.ACCOUNT_MENU, false));
    dispatch(changeProjectMenu(PROJECT_MENU_TYPE.OPEN_PROJECT_MENU, true));
  };

  const handleCreateClick = () => {
    dispatch(changeProjectMenu(PROJECT_MENU_TYPE.ACCOUNT_MENU, false));
    dispatch(changeProjectMenu(PROJECT_MENU_TYPE.CREATE_PROJECT_MENU, true));
  };

  const handleSaveClick = () => {
    dispatch(changeProjectMenu(PROJECT_MENU_TYPE.ACCOUNT_MENU, false));
    if (projectState.project) dispatch(save(projectState.project));
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
      <div className="ProjectMenu" style={{ zIndex: 2 }}>
        <OpenProjectMenu />
        <CreateProjectMenu />
      </div>
    </>
  );
};

export default AccountMenu;
