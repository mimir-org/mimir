import * as Handlers from "./handlers";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store/index";
import { UserState } from "../../../redux/store/user/types";
import { ProjectState } from "../../../redux/store/project/types";
import { GetMenuElement } from "./helpers";
import { MENU_TYPE } from "../../../models/project";
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

  return (
    <>
      <AccountMenuBox id={MENU_TYPE.ACCOUNT_MENU}>
        <GetMenuElement
          type="Open"
          onClick={() => Handlers.OnOpenClick(dispatch)}
        />
        <GetMenuElement
          type="Create"
          onClick={() => Handlers.OnCreateClick(dispatch)}
        />
        <GetMenuElement
          type="Save"
          onClick={() => Handlers.OnSaveClick(dispatch, projectState)}
        />
        <GetMenuElement
          type="SaveLibrary"
          onClick={() => Handlers.OnSaveLibraryFile(dispatch)}
        />
        <GetMenuElement
          type="SaveFile"
          onClick={() => Handlers.OnSaveFile(dispatch)}
        />
        <MenuLine />
        <GetMenuElement
          type="ImportProject"
          onClick={() => Handlers.OnImportProjectFile(dispatch)}
        />
        <GetMenuElement
          type="ImportLibrary"
          onClick={() => Handlers.OnImportLibraryFile(dispatch)}
        />
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
