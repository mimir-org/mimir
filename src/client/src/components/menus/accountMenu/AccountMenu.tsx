import * as Click from "./handlers";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store/index";
import { UserState } from "../../../redux/store/user/types";
import { ProjectState } from "../../../redux/store/project/types";
import { GetMenuElement } from "./helpers";
import { MENU_TYPE } from "../../../models/project";
import { OpenProjectMenu } from "../project/openProject";
import { CreateProjectMenu } from "../project/createProject";
import { ExportProjectFileMenu } from "../project/exportProjectFile";
import { ImportProjectFileMenu } from "../project/importProjectFile/ImportProjectFileMenu";
import { ExportLibraryFileMenu } from "../project/exportLibraryFile/ExportLibraryFileMenu";
import { ImportFileLibraryMenu } from "../project/importLibrary/ImportFileLibraryMenu";
import { MenuLine, AccountMenuBox, ProjectMenuBox } from "../../../compLibrary/box/menus";
import { TextResources } from "../../../assets/text";
import { useRef } from "react";
import { setAccountMenuVisibility } from "../project/redux/actions";
import { useOutsideClick } from "./hooks/useOutsideClick";

const AccountMenu = () => {
  const dispatch = useDispatch();
  const projectState = useSelector<RootState>((state) => state.projectState) as ProjectState;
  const userState = useSelector<RootState>((state) => state.userState) as UserState;
  const activeMenu = useSelector<RootState>((state) => state.menu.activeMenu) as string;

  const menuRef = useRef(null);

  useOutsideClick(menuRef, () => !activeMenu && dispatch(setAccountMenuVisibility(false)));

  return (
    <>
      <AccountMenuBox ref={menuRef} id={MENU_TYPE.ACCOUNT_MENU}>
        <GetMenuElement type={TextResources.Account_Open} onClick={() => Click.OnOpenC(dispatch)} />
        <GetMenuElement type={TextResources.Account_Create} onClick={() => Click.OnCreate(dispatch)} />
        <GetMenuElement type={TextResources.Account_Save} onClick={() => Click.OnSave(dispatch, projectState)} />
        <GetMenuElement type={TextResources.Account_Save_Library} onClick={() => Click.OnSaveLibrary(dispatch)} />
        <GetMenuElement type={TextResources.Account_Save_File} onClick={() => Click.OnSaveFile(dispatch)} />
        <GetMenuElement type={TextResources.Account_Commit} onClick={() => Click.OnCommit(dispatch, projectState)} />
        <MenuLine />
        <GetMenuElement type={TextResources.Account_Import_Project} onClick={() => Click.OnImportProject(dispatch)} />
        <GetMenuElement type={TextResources.Account_Import_Lib_Label} onClick={() => Click.OnImportLibrary(dispatch)} />
        <MenuLine />
        <GetMenuElement type={TextResources.Account_Logout} userState={userState} />
      </AccountMenuBox>

      <ProjectMenuBox>
        <OpenProjectMenu projectState={projectState} dispatch={dispatch} />
        <CreateProjectMenu />
        <ExportProjectFileMenu projectState={projectState} dispatch={dispatch} />
        <ImportProjectFileMenu />
        <ExportLibraryFileMenu />
        <ImportFileLibraryMenu />
      </ProjectMenuBox>
    </>
  );
};

export default AccountMenu;
