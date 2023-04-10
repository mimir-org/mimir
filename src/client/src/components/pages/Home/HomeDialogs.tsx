import { MENU_TYPE } from "../../../models/project";
import { useAppSelector } from "store";
// import { CommitProjectMenu } from "./components/subMenus/commitProject/CommitProjectMenu";
// import { CreateProjectMenu } from "./components/subMenus/createProject/CreateProjectMenu";
// import { CloseProjectMenu } from "./components/subMenus/closeProject/CloseProjectMenu";
// import { CreateSubProjectMenu } from "./components/subMenus/createSubProject/CreateSubProjectMenu";
// import { ExportProjectFileMenu } from "./components/subMenus/exportProjectFile/ExportProjectFileMenu";
// import { ImportProjectFileMenu } from "./components/subMenus/importProjectFile/ImportProjectFileMenu";
import { ProjectDialog, CreateProjectDialog, ImportProjectDialog } from "components/dialogs";
import { CommonState, setDialogType } from "store/reducers/commonReducer";
import { ConnectorTerminal, DialogType } from "lib";
// import { ConvertSubProjectMenu } from "./components/subMenus/convertSubProject/ConvertSubProjectMenu";
import { Dispatch } from "redux";
import { ProjectState } from "store/reducers/projectReducer";

interface Props {
  dispatch: Dispatch;
  projectState: ProjectState;
  commonState: CommonState;
}

/**
 * Component for all sub-menus in the Mimir project menu.
 * The sub-menus are all the options listed in the the ProjectMenuComponent.
 * This component is called from the Home component.
 * @returns all sub-menus.
 */
export const HomeDialogs = ({ dispatch, commonState, projectState }: Props) => {
  // const isOpenProjectMenuOpen = activeMenu === MENU_TYPE.OPEN_PROJECT_MENU;
  // const isCreateProjectMenuOpen = activeMenu === MENU_TYPE.CREATE_PROJECT_MENU;
  // const isCloseProjectMenuOpen = activeMenu === MENU_TYPE.CLOSE_PROJECT_MENU;
  // const isImportProjectFileMenuOpen = activeMenu === MENU_TYPE.IMPORT_PROJECT_FILE_MENU;
  // const isExportProjectFileMenuOpen = activeMenu === MENU_TYPE.EXPORT_PROJECT_FILE_MENU;
  // const isCommitProjectMenuOpen = activeMenu === MENU_TYPE.COMMIT_PROJECT_MENU;
  // const isCreateSubProjectMenu = activeMenu === MENU_TYPE.CREATE_SUB_PROJECT_MENU;
  // const isConvertSubProjectMenu = activeMenu === MENU_TYPE.CONVERT_SUB_PROJECT_MENU;

  const onCreateProject = (name: string) => {
    console.log("onCreateProject", name);
  };

  const onOpenProject = (id: string) => {
    console.log("onOpenProject", id);
  };

  const onProjectSearchBarChange = (id: string) => {
    console.log("onSearchBarChange", id);
  };

  const onProjectImport = (file: File, parserId: string) => {
    console.log("onProjectImport", file.name, parserId);
  };

  const onExit = () => {
    dispatch(setDialogType({ dialog: DialogType.None }));
  };

  const projects = projectState?.projectList?.map((x) => x.toProjectListItem());
  const parsers = commonState?.parsers;

  return (
    <>
      {commonState.dialog === DialogType.Project && (
        <ProjectDialog
          onOpenProject={onOpenProject}
          onSearchBarChange={onProjectSearchBarChange}
          projects={projects}
          open={commonState.dialog === DialogType.Project}
          onExit={onExit}
        />
      )}

      {commonState.dialog === DialogType.CreateProject && (
        <CreateProjectDialog
          onCreateProject={onCreateProject}
          open={commonState.dialog === DialogType.CreateProject}
          onExit={onExit}
        />
      )}

      {commonState.dialog === DialogType.ImportProject && (
        <ImportProjectDialog
          parsers={parsers}
          onImportProject={onProjectImport}
          open={commonState.dialog === DialogType.ImportProject}
          onExit={onExit}
        />
      )}

      {/* {isCreateProjectMenuOpen && <CreateProjectMenu />}
      {isCloseProjectMenuOpen && <CloseProjectMenu />}
      {isImportProjectFileMenuOpen && <ImportProjectFileMenu />}
      {isExportProjectFileMenuOpen && <ExportProjectFileMenu />}
      {isCommitProjectMenuOpen && <CommitProjectMenu />}
      {isCreateSubProjectMenu && <CreateSubProjectMenu />}
      {isConvertSubProjectMenu && <ConvertSubProjectMenu />} */}
    </>
  );
};
