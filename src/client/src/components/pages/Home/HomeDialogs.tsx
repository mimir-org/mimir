import { MENU_TYPE } from "../../../models/project";
import { useAppSelector } from "store";
// import { CommitProjectMenu } from "./components/subMenus/commitProject/CommitProjectMenu";
// import { CreateProjectMenu } from "./components/subMenus/createProject/CreateProjectMenu";
// import { CloseProjectMenu } from "./components/subMenus/closeProject/CloseProjectMenu";
// import { CreateSubProjectMenu } from "./components/subMenus/createSubProject/CreateSubProjectMenu";
// import { ExportProjectFileMenu } from "./components/subMenus/exportProjectFile/ExportProjectFileMenu";
// import { ImportProjectFileMenu } from "./components/subMenus/importProjectFile/ImportProjectFileMenu";
import {
  ProjectDialog,
  CreateProjectDialog,
  ImportProjectDialog,
  CloseProjectDialog,
  CreateSubProjectDialog,
  ConvertProjectDialog,
  ExportProjectDialog,
} from "components/dialogs";
import { CommonState, setDialogType, setViewType } from "store/reducers/commonReducer";
import { DialogType, Position, Project, ViewType } from "lib";
// import { ConvertSubProjectMenu } from "./components/subMenus/convertSubProject/ConvertSubProjectMenu";
import { Dispatch } from "redux";
import {ProjectState, createProject, saveProjectInDb, updateProjectInDb} from "store/reducers/projectReducer";
import { LibraryState } from "store/reducers/libraryReducer";
import {SaveProjectDialog} from "../../dialogs/project/Save/SaveProjectDialog";

interface Props {
  dispatch: Dispatch;
  projects: Project[];
  project: Project;
  commonState: CommonState;
  libraryState: LibraryState;
  onCreateProject: (name: string, description: string) => void;
}

/**
 * Component for all sub-menus in the Mimir project menu.
 * The sub-menus are all the options listed in the the ProjectMenuComponent.
 * This component is called from the Home component.
 * @returns all sub-menus.
 */
export const HomeDialogs = ({ dispatch, commonState, projects, project, libraryState, onCreateProject }: Props) => {
  // const isOpenProjectMenuOpen = activeMenu === MENU_TYPE.OPEN_PROJECT_MENU;
  // const isCreateProjectMenuOpen = activeMenu === MENU_TYPE.CREATE_PROJECT_MENU;
  // const isCloseProjectMenuOpen = activeMenu === MENU_TYPE.CLOSE_PROJECT_MENU;
  // const isImportProjectFileMenuOpen = activeMenu === MENU_TYPE.IMPORT_PROJECT_FILE_MENU;
  // const isExportProjectFileMenuOpen = activeMenu === MENU_TYPE.EXPORT_PROJECT_FILE_MENU;
  // const isCommitProjectMenuOpen = activeMenu === MENU_TYPE.COMMIT_PROJECT_MENU;
  // const isCreateSubProjectMenu = activeMenu === MENU_TYPE.CREATE_SUB_PROJECT_MENU;
  // const isConvertSubProjectMenu = activeMenu === MENU_TYPE.CONVERT_SUB_PROJECT_MENU;

  // const onCreateProject = (name: string) => {
  //   console.log("onCreateProject", name);
  //   const project = new Project(name, "reidar.liabo@bouvet.no", "This is the project description");
  //   const randomObject = libraryState?.aspectObjectTypes[0];
  //   project.addAspectObject(randomObject, new Position(100, 100), new Position(0, 0), "reidar.liabo@bouvet.no");
  //   // project.addAspectObject(randomObject, new Position(300, 300), new Position(0, 0), "reidar.liabo@bouvet.no");

  //   dispatch(createProject({ project: project }));
  //   dispatch(setDialogType({ dialog: DialogType.None }));
  //   dispatch(setViewType({ view: ViewType.Tree }));
  // };

  const onOpenProject = (id: string) => {
    console.log("onOpenProject", id);
  };

  const onCreateClick = () => {
    console.log("onCreateClick");
  };

  const onSaveProject = () => {
    if(project.id === null) {
      dispatch(saveProjectInDb({project}));
    }else{
      dispatch(updateProjectInDb({project}));
    }
  }

  const onImportProjectClick = () => {
    console.log("onImportProjectClick");
  };

  const onProjectSearchBarChange = (id: string) => {
    console.log("onSearchBarChange", id);
  };

  const onProjectImport = (file: File, parserId: string) => {
    console.log("onProjectImport", file.name, parserId);
  };

  const onCloseProject = () => {
    console.log("onOCloseProject");
  };

  const onConvertProject = () => {
    console.log("onConvertProject");
  };

  const onExit = () => {
    dispatch(setDialogType({ dialog: DialogType.None }));
  };

  const onCreateSubProject = (name: string) => {
    console.log("onCreateSubProject", name);
  };

  const onExportProjectFileClick = (fileName: string, parserId: string) => {
    // const convertedProject = ConvertProjectToProjectAm(project);

    // const converter: ProjectConverterAm = {
    //   project: convertedProject,
    //   fileName: fileName,
    //   parserId: parserId,
    // };

    // dispatch(exportProjectToFile(converter));
    // dispatch(changeActiveMenu(null));
    console.log("onExportProjectFileClick", fileName, parserId);
  };

  const parsers = commonState?.parsers;

  return (
    <>
      {commonState.dialog === DialogType.Project && (
        <ProjectDialog
          onOpenProject={onOpenProject}
          onSearchBarChange={onProjectSearchBarChange}
          projects={projects?.map((x) => x.toProjectListItem())}
          open={commonState.dialog === DialogType.Project}
          onExit={onExit}
          onCreateClick={onCreateClick}
          onImportProjectClick={onImportProjectClick}
        />
      )}

      {commonState.dialog === DialogType.CreateProject && (
        <CreateProjectDialog
          onCreateProject={(name) => {
            onCreateProject(name, null);
          }}
          open={commonState.dialog === DialogType.CreateProject}
          onExit={onExit}
        />
      )}

      {commonState.dialog === DialogType.SaveProject && (
          <SaveProjectDialog
              onSaveProject={onSaveProject}
              open={commonState.dialog === DialogType.SaveProject}
              onExit={onExit}
          />
      )}

      {commonState.dialog === DialogType.CloseProject && (
          <CloseProjectDialog
              onCloseProject={onCloseProject}
              open={commonState.dialog === DialogType.CloseProject}
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


      {commonState.dialog === DialogType.CreateSubProject && (
        <CreateSubProjectDialog
          onCreateSubProject={onCreateSubProject}
          open={commonState.dialog === DialogType.CreateSubProject}
          onExit={onExit}
        />
      )}

      {commonState.dialog === DialogType.ConvertProject && (
        <ConvertProjectDialog
          isSubProject={false}
          onConvertProject={onConvertProject}
          open={commonState.dialog === DialogType.ConvertProject}
          onExit={onExit}
        />
      )}

      {commonState.dialog === DialogType.ExportProject && (
        <ExportProjectDialog
          parsers={commonState.parsers}
          open={commonState.dialog === DialogType.ExportProject}
          onExit={onExit}
          onExportProjectFileClick={onExportProjectFileClick}
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
