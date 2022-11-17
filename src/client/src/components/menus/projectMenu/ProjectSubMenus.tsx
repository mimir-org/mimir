import { MENU_TYPE } from "../../../models/project";
import { projectIsSubProjectSelector, useAppSelector } from "../../../redux/store";
import { CommitProjectMenu } from "./components/subMenus/commitProject/CommitProjectMenu";
import { CreateProjectMenu } from "./components/subMenus/createProject/CreateProjectMenu";
import { CloseProjectMenu } from "./components/subMenus/closeProject/CloseProjectMenu";
import { CreateSubProjectMenu } from "./components/subMenus/createSubProject/CreateSubProjectMenu";
import { ExportProjectFileMenu } from "./components/subMenus/exportProjectFile/ExportProjectFileMenu";
import { ImportProjectFileMenu } from "./components/subMenus/importProjectFile/ImportProjectFileMenu";
import { OpenProjectMenu } from "./components/subMenus/openProject/OpenProjectMenu";

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
  const isSubProject = useAppSelector(projectIsSubProjectSelector);

  const isOpenProjectMenuOpen = activeMenu === MENU_TYPE.OPEN_PROJECT_MENU;
  const isCreateProjectMenuOpen = activeMenu === MENU_TYPE.CREATE_PROJECT_MENU;
  const isCloseProjectMenuOpen = activeMenu === MENU_TYPE.CLOSE_PROJECT_MENU;
  const isImportProjectFileMenuOpen = activeMenu === MENU_TYPE.IMPORT_PROJECT_FILE_MENU;
  const isExportProjectFileMenuOpen = activeMenu === MENU_TYPE.EXPORT_PROJECT_FILE_MENU;
  const isCommitProjectMenuOpen = activeMenu === MENU_TYPE.COMMIT_PROJECT_MENU;
  const isCreateSubProjectMenu = activeMenu === MENU_TYPE.CREATE_SUB_PROJECT_MENU;

  return (
    <>
      {isOpenProjectMenuOpen && <OpenProjectMenu />}
      {isCreateProjectMenuOpen && <CreateProjectMenu />}
      {isCloseProjectMenuOpen && <CloseProjectMenu />}
      {isImportProjectFileMenuOpen && <ImportProjectFileMenu />}
      {isExportProjectFileMenuOpen && <ExportProjectFileMenu />}
      {isCommitProjectMenuOpen && !isSubProject && <CommitProjectMenu />}
      {isCreateSubProjectMenu && <CreateSubProjectMenu />}
    </>
  );
};
