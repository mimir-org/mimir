import { memo } from "react";
import { MENU_TYPE } from "../../../models/project";
import { activeMenuSelector, useAppSelector } from "../../../redux/store";
import { CommitProjectMenu } from "./components/subMenus/commitProject/CommitProjectMenu";
import { CreateProjectMenu } from "./components/subMenus/createProject/CreateProjectMenu";
import { CreateSubProjectMenu } from "./components/subMenus/createSubProject/CreateSubProjectMenu";
import { ExportLibraryFileMenu } from "./components/subMenus/exportLibraryFile/ExportLibraryFileMenu";
import { ExportProjectFileMenu } from "./components/subMenus/exportProjectFile";
import { ImportFileLibraryMenu } from "./components/subMenus/importLibrary/ImportFileLibraryMenu";
import { ImportProjectFileMenu } from "./components/subMenus/importProjectFile/ImportProjectFileMenu";
import { OpenProjectMenu } from "./components/subMenus/openProject/OpenProjectMenu";

/**
 * Component for all sub-menus in the Mimir project menu.
 * This component is called from the Home component.
 * @returns all sub-menus.
 */
const ProjectSubMenus = () => {
  const activeMenu = useAppSelector(activeMenuSelector);
  const isOpenProjectMenuOpen = activeMenu === MENU_TYPE.OPEN_PROJECT_MENU;
  const isCreateProjectMenuOpen = activeMenu === MENU_TYPE.CREATE_PROJECT_MENU;
  const isExportMenuOpen = activeMenu === MENU_TYPE.EXPORT_PROJECT_FILE_MENU;
  const isImportMenuOpen = activeMenu === MENU_TYPE.IMPORT_PROJECT_FILE_MENU;
  const isExportLibraryFileMenuOpen = activeMenu === MENU_TYPE.EXPORT_LIBRARY_FILE_MENU;
  const isImportLibraryFileMenuOpen = activeMenu === MENU_TYPE.IMPORT_LIBRARY_FILE_MENU;
  const isCommitProjectMenuOpen = activeMenu === MENU_TYPE.COMMIT_PROJECT;
  const isCreateSubProjectMenu = activeMenu === MENU_TYPE.CREATE_SUB_PROJECT_MENU;

  return (
    <>
      {isOpenProjectMenuOpen && <OpenProjectMenu />}
      {isCreateProjectMenuOpen && <CreateProjectMenu />}
      {isExportMenuOpen && <ExportProjectFileMenu />}
      {isImportMenuOpen && <ImportProjectFileMenu />}
      {isImportLibraryFileMenuOpen && <ImportFileLibraryMenu />}
      {isExportLibraryFileMenuOpen && <ExportLibraryFileMenu />}
      {isCommitProjectMenuOpen && <CommitProjectMenu />}
      {isCreateSubProjectMenu && <CreateSubProjectMenu />}
    </>
  );
};

export default memo(ProjectSubMenus);
