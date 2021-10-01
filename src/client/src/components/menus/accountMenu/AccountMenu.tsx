import * as Handlers from "./handlers";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store/index";
import { UserState } from "../../../redux/store/user/types";
import { ProjectState } from "../../../redux/store/project/types";
import { GetMenuElement } from "./helpers";
import { MENU_TYPE } from "../../../models/project";
import { OpenProjectMenu } from "../../project/openProject";
import { CreateProjectMenu } from "../../project/createProject";
import { ExportProjectFileMenu } from "../../project/exportProjectFile";
import { ImportProjectFileMenu } from "../../project/importProjectFile/ImportProjectFileMenu";
import { ExportLibraryFileMenu } from "../../project/exportLibraryFile/ExportLibraryFileMenu";
import { ImportFileLibraryMenu } from "../../project/importLibrary/ImportFileLibraryMenu";
import { MenuLine, AccountMenuBox } from "../../../compLibrary/box/menus";
import { TextResources } from "../../../assets/text";

const AccountMenu = () => {
  const dispatch = useDispatch();
  const projectState = useSelector<RootState>((state) => state.projectState) as ProjectState;
  const userState = useSelector<RootState>((state) => state.userState) as UserState;

  return (
    <>
      <AccountMenuBox id={MENU_TYPE.ACCOUNT_MENU}>
        <GetMenuElement
          type={TextResources.Account_Open}
          onClick={() => Handlers.OnOpenClick(dispatch)}
        />
        <GetMenuElement
          type={TextResources.Account_Create}
          onClick={() => Handlers.OnCreateClick(dispatch)}
        />
        <GetMenuElement
          type={TextResources.Account_Save}
          onClick={() => Handlers.OnSaveClick(dispatch, projectState)}
        />
        <GetMenuElement
          type={TextResources.Account_Save_Library}
          onClick={() => Handlers.OnSaveLibraryFile(dispatch)}
        />
        <GetMenuElement
          type={TextResources.Account_Save_File}
          onClick={() => Handlers.OnSaveFile(dispatch)}
        />
        <GetMenuElement
          type={TextResources.Account_Commit_Project}
          onClick={() => Handlers.OnCommitClick(dispatch, projectState)}
        />
        <MenuLine />
        <GetMenuElement
          type={TextResources.Account_Import_Project}
          onClick={() => Handlers.OnImportProjectFile(dispatch)}
        />
        <GetMenuElement
          type={TextResources.Account_Import_Library_Label}
          onClick={() => Handlers.OnImportLibraryFile(dispatch)}
        />
        <MenuLine />
        <GetMenuElement type={TextResources.Account_Logout} userState={userState} />
      </AccountMenuBox>

      <div className="ProjectMenu" style={{ zIndex: 2 }}>
        <OpenProjectMenu projectState={projectState} dispatch={dispatch} />
        <CreateProjectMenu />
        <ExportProjectFileMenu projectState={projectState} dispatch={dispatch} />
        <ImportProjectFileMenu />
        <ExportLibraryFileMenu />
        <ImportFileLibraryMenu />
      </div>
    </>
  );
};

export default AccountMenu;
