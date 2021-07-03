import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store/index";
import { UserState } from "../../../redux/store/user/types";
import { ProjectState } from "../../../redux/store/project/types";
import { save } from "../../../redux/store/project/actions";
import { GetMenuElement } from "./helpers";
import { MENU_TYPE } from "../../../models/project";
import { changeMenu } from "../../../redux/store/projectMenu/actions";
import { OpenProjectMenu } from "../../project/openProject";
import { CreateProjectMenu } from "../../project/createProject";
import { saveAs } from "file-saver";
import { MenuLine, MenuBox } from "../../../compLibrary/box/menus";

const AccountMenu = () => {
  const dispatch = useDispatch();
  const projectState = useSelector<RootState>(
    (state) => state.projectState
  ) as ProjectState;

  const userState = useSelector<RootState>(
    (state) => state.userState
  ) as UserState;

  const onOpenClick = () => {
    dispatch(changeMenu(MENU_TYPE.OPEN_PROJECT_MENU, true));
  };

  const onCreateClick = () => {
    dispatch(changeMenu(MENU_TYPE.CREATE_PROJECT_MENU, true));
  };

  const onSaveClick = () => {
    dispatch(changeMenu(MENU_TYPE.ACCOUNT_MENU, false));
    if (projectState.project) dispatch(save(projectState.project));
  };

  const onSaveFile = () => {
    dispatch(changeMenu(MENU_TYPE.ACCOUNT_MENU, false));
    if (projectState.project) {
      const blob = new Blob([JSON.stringify(projectState.project, null, 2)], {
        type: "application/json",
      });
      saveAs(blob, projectState.project.id + ".json");
    }
  };

  const onSaveLibraryFile = () => {
    dispatch(changeMenu(MENU_TYPE.ACCOUNT_MENU, false));
    if (projectState.project) {
      const blob = new Blob([JSON.stringify(projectState.project, null, 2)], {
        type: "application/json",
      });
      saveAs(blob, projectState.project.id + ".json");
    }
  };

  return (
    <>
      <MenuBox id={MENU_TYPE.ACCOUNT_MENU}>
        <GetMenuElement type="Open" onClick={onOpenClick} />
        <GetMenuElement type="Create" onClick={onCreateClick} />
        <GetMenuElement type="Save" onClick={onSaveClick} />
        <GetMenuElement type="SaveLibrary" onClick={onSaveLibraryFile} />
        <GetMenuElement type="SaveFile" onClick={onSaveFile} />
        <MenuLine />
        <GetMenuElement type="ImportProject" onClick={null} />
        <GetMenuElement type="ImportLibrary" onClick={null} />
        <MenuLine />
        <GetMenuElement type="Logout" userState={userState} />
      </MenuBox>
      <div className="ProjectMenu" style={{ zIndex: 2 }}>
        <OpenProjectMenu />
        <CreateProjectMenu />
      </div>
    </>
  );
};

export default AccountMenu;
