import { MENU_TYPE } from "../../../models/project";
// import { projectIsSubProjectSelector } from "../../../redux/store";
import { useAppSelector } from "store";

// import { CreateProjectMenu } from "../../dialogs/createProject/CreateProject";

// import { ImportProjectFileMenu } from "./components/subMenus/importProjectFile/ImportProjectFileMenu";

import { setDialogType } from "store/reducers/commonReducer";
import { DialogType } from "lib";
import { CloseProjectMenu } from "./closeProject/CloseProjectMenu";
import { ExportProjectFileMenu } from "./exportProjectFile/ExportProjectFileMenu";
import { CommitProjectMenu } from "./commitProject/CommitProjectMenu";
import { CreateSubProjectMenu } from "./createSubProject/CreateSubProjectMenu";
import { ConvertSubProjectMenu } from "./convertSubProject/ConvertSubProjectMenu";

interface Props {
  activeMenu: string;
}

/**
 * Component for all sub-menus in the Mimir project menu.
 * The sub-menus are all the options listed in the the ProjectMenuComponent.
 * This component is called from the Home component.
 * @returns all sub-menus.
 */
export const ProjectSubMenus = ({ activeMenu }: Props) => {
  const isSubProject = false; //useAppSelector(projectIsSubProjectSelector);

  const isOpenProjectMenuOpen = activeMenu === MENU_TYPE.OPEN_PROJECT_MENU;
  const isCreateProjectMenuOpen = activeMenu === MENU_TYPE.CREATE_PROJECT_MENU;
  const isCloseProjectMenuOpen = activeMenu === MENU_TYPE.CLOSE_PROJECT_MENU;
  const isImportProjectFileMenuOpen = activeMenu === MENU_TYPE.IMPORT_PROJECT_FILE_MENU;
  const isExportProjectFileMenuOpen = activeMenu === MENU_TYPE.EXPORT_PROJECT_FILE_MENU;
  const isCommitProjectMenuOpen = activeMenu === MENU_TYPE.COMMIT_PROJECT_MENU;
  const isCreateSubProjectMenu = activeMenu === MENU_TYPE.CREATE_SUB_PROJECT_MENU;
  const isConvertSubProjectMenu = activeMenu === MENU_TYPE.CONVERT_SUB_PROJECT_MENU;

  return (
    <>
      {/* <ProjectDialog
        onOpenProject={onOpenProject}
        onSearchBarChange={onSearchBarChange}
        projects={[]}
        open={isOpenProjectMenuOpen}
      /> */}

      {/* {isCreateProjectMenuOpen && <CreateProjectMenu />} */}
      {isCloseProjectMenuOpen && <CloseProjectMenu />}
      {/* {isImportProjectFileMenuOpen && <ImportProjectFileMenu />} */}
      {isExportProjectFileMenuOpen && <ExportProjectFileMenu />}
      {isCommitProjectMenuOpen && !isSubProject && <CommitProjectMenu />}
      {isCreateSubProjectMenu && <CreateSubProjectMenu />}
      {isConvertSubProjectMenu && <ConvertSubProjectMenu />}
    </>
  );
};
