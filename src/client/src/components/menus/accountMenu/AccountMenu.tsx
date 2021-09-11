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
import { SaveProjectFileMenu } from "../../project/saveProjectFile";
import { ImportProjectFileMenu } from "../../project/importProjectFile/ImportProjectFileMenu";
import { SaveLibraryFileMenu } from "../../project/saveLibraryFile/SaveLibraryFileMenu";
import { ImportFileLibraryMenu } from "../../project/importLibrary/ImportFileLibraryMenu";
import { MenuLine, AccountMenuBox } from "../../../compLibrary/box/menus";

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
    dispatch(changeMenu(MENU_TYPE.SAVE_PROJECT_FILE_MENU, true));
  };

  const onImportProjectFile = () => {
    dispatch(changeMenu(MENU_TYPE.IMPORT_PROJECT_FILE_MENU, true));
  };

  const onSaveLibraryFile = () => {
    dispatch(changeMenu(MENU_TYPE.SAVE_LIBRARY_FILE_MENU, true));
  };

  const onImportLibraryFile = () => {
    dispatch(changeMenu(MENU_TYPE.IMPORT_LIBRARY_FILE_MENU, true));
  };

  return (
    <>
      <AccountMenuBox id={MENU_TYPE.ACCOUNT_MENU}>
        <GetMenuElement type="Open" onClick={onOpenClick} />
        <GetMenuElement type="Create" onClick={onCreateClick} />
        <GetMenuElement type="Save" onClick={onSaveClick} />
        <GetMenuElement type="SaveLibrary" onClick={onSaveLibraryFile} />
        <GetMenuElement type="SaveFile" onClick={onSaveFile} />
        <MenuLine />
        <GetMenuElement type="ImportProject" onClick={onImportProjectFile} />
        <GetMenuElement type="ImportLibrary" onClick={onImportLibraryFile} />
        <MenuLine />
        <GetMenuElement type="Logout" userState={userState} />
      </AccountMenuBox>
      <div className="ProjectMenu" style={{ zIndex: 2 }}>
        <OpenProjectMenu projectState={projectState} />
        <CreateProjectMenu />
        <SaveProjectFileMenu projectState={projectState} />
        <ImportProjectFileMenu />
        <SaveLibraryFileMenu />
        <ImportFileLibraryMenu />
      </div>
    </>
  );
};

export default AccountMenu;
