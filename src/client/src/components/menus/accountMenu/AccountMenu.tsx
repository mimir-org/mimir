import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store/index";
import { UserState } from "../../../redux/store/user/types";
import { ProjectState } from "../../../redux/store/project/types";
import { save } from "../../../redux/store/project/actions";
import { GetMenuElement } from "./helpers";
import { GetMenuIcon } from "../../../assets/helpers";
import { MENU_TYPE, PROJECT_MENU_TYPE } from "../../../models/project";
import { changeProjectMenu } from "../../../redux/store/projectMenu/actions";
import { OpenProjectMenu } from "../../project/openProject";
import { CreateProjectMenu } from "../../project/createProject";
import { saveAs } from "file-saver";
import {
  HrLine,
  MenuBox,
  MenuMainHeader,
} from "../../../compLibrary/box/menus";

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

  const handleSaveFileClick = () => {
    dispatch(changeProjectMenu(PROJECT_MENU_TYPE.ACCOUNT_MENU, false));
    if (projectState.project) {
      const blob = new Blob([JSON.stringify(projectState.project, null, 2)], {
        type: "application/json",
      });
      saveAs(blob, projectState.project.id + ".json");
    }
  };

  const handleSaveLibraryFileClick = () => {
    dispatch(changeProjectMenu(PROJECT_MENU_TYPE.ACCOUNT_MENU, false));
    if (projectState.project) {
      const blob = new Blob([JSON.stringify(projectState.project, null, 2)], {
        type: "application/json",
      });
      saveAs(blob, projectState.project.id + ".json");
    }
  };

  const dummy = () => {};

  return (
    <>
      <MenuMainHeader isOpen={isOpen}>
        <div className="text" onClick={handleAccountClick}>
          {projectState.project && projectState.project.name}
        </div>
        <img
          src={GetMenuIcon(isOpen, type)}
          alt="icon"
          className="icon"
          onClick={handleAccountClick}
        />
      </MenuMainHeader>
      {isOpen && (
        <MenuBox id={type}>
          <GetMenuElement type="Open" onClick={handleOpenClick} />
          <GetMenuElement type="Create" onClick={handleCreateClick} />
          <GetMenuElement type="Save" onClick={handleSaveClick} />
          <GetMenuElement
            type="SaveLibrary"
            onClick={handleSaveLibraryFileClick}
          />
          <GetMenuElement type="SaveFile" onClick={handleSaveFileClick} />
          <HrLine />
          <GetMenuElement type="ImportProject" onClick={dummy} />
          <GetMenuElement type="ImportLibrary" onClick={dummy} />
          <HrLine />
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
