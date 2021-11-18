import * as Click from "./handlers";
import { useCallback, useRef } from "react";
import { GetMenuElement } from "./helpers";
import { MENU_TYPE } from "../../../models/project";
import { OpenProjectMenu } from "../projectMenu/subMenus/openProject";
import { CreateProjectMenu } from "../projectMenu/subMenus/createProject";
import { ExportProjectFileMenu } from "../projectMenu/subMenus/exportProjectFile";
import { ImportProjectFileMenu } from "../projectMenu/subMenus/importProjectFile/ImportProjectFileMenu";
import { ExportLibraryFileMenu } from "../projectMenu/subMenus/exportLibraryFile/ExportLibraryFileMenu";
import { ImportFileLibraryMenu } from "../projectMenu/subMenus/importLibrary/ImportFileLibraryMenu";
import { TextResources } from "../../../assets/text";
import { setProjectMenuVisibility } from "../projectMenu/subMenus/redux/actions";
import { useOutsideClick } from "./hooks/useOutsideClick";
import { activeMenuSelector, commonStateSelector, projectStateSelector } from "../../../redux/store";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import { CommitProjectMenu } from "../projectMenu/subMenus/commitProject";
import { CreateSubProjectMenu } from "../projectMenu/subMenus/createSubProject";
import { useSelectedFlowElements } from "../../../helpers/UseSelectedFlowElements";
import { ProjectNameBox } from "./styled";
import { ProjectMenuBox } from "../styled";

/**
 * Component for the Project Menu.
 * @returns a menu for the Project in the header of Mimir.
 */
const ProjectMenuComponent = () => {
  const dispatch = useAppDispatch();
  const projectState = useAppSelector(projectStateSelector);
  const commonState = useAppSelector(commonStateSelector);
  const activeMenu = useAppSelector(activeMenuSelector);
  const menuRef = useRef(null);

  const [selectedNodeIds, selectedEdgeIds] = useSelectedFlowElements();

  const onOutsideClick = useCallback(() => !activeMenu && dispatch(setProjectMenuVisibility(false)), [activeMenu, dispatch]);
  useOutsideClick(menuRef, onOutsideClick);

  return (
    <>
      <ProjectMenuBox ref={menuRef} id={MENU_TYPE.PROJECT_MENU} isProject={true}>
        <ProjectNameBox>
          <p>{projectState?.project?.name}</p>
        </ProjectNameBox>
        <GetMenuElement type={TextResources.Account_Open} onClick={() => Click.OnOpenClick(dispatch)} />
        <GetMenuElement type={TextResources.Account_Create} onClick={() => Click.OnCreate(dispatch)} />
        <GetMenuElement type={TextResources.Account_Save} onClick={() => Click.OnSave(dispatch, projectState)} />
        <GetMenuElement type={TextResources.Account_Save_Library} onClick={() => Click.OnSaveLibrary(dispatch)} />
        <GetMenuElement type={TextResources.Account_Save_File} onClick={() => Click.OnSaveFile(dispatch)} />
        <GetMenuElement
          type={TextResources.Account_Commit}
          onClick={() => Click.OnCommit(dispatch)}
          disabled={!projectState?.project?.isSubProject}
        />
        <GetMenuElement
          type={TextResources.Account_SubProject_Create}
          onClick={() => Click.OnCreateSubprojectClick(dispatch)}
          disabled={!selectedNodeIds}
        />
        <GetMenuElement type={TextResources.Account_Import_Project} onClick={() => Click.OnImportProject(dispatch)} />
        <GetMenuElement type={TextResources.Account_Import_Lib_Label} onClick={() => Click.OnImportLibrary(dispatch)} />
      </ProjectMenuBox>

      <OpenProjectMenu projectState={projectState} dispatch={dispatch} />
      <CreateProjectMenu />
      <ExportProjectFileMenu projectState={projectState} dispatch={dispatch} />
      <ImportProjectFileMenu />
      <ExportLibraryFileMenu />
      <ImportFileLibraryMenu />
      <CommitProjectMenu
        contractors={commonState.contractors}
        parsers={commonState.parsers}
        projectId={projectState?.project?.id}
        disabled={!projectState?.project?.isSubProject}
      />
      <CreateSubProjectMenu
        fromProjectId={projectState?.project?.id}
        nodeIds={selectedNodeIds}
        edgeIds={selectedEdgeIds}
        disabled={!selectedNodeIds}
      />
    </>
  );
};

export default ProjectMenuComponent;
