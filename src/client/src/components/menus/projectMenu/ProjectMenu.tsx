import * as Click from "./handlers";
import { GetMenuElement } from "./helpers";
import { MENU_TYPE } from "../../../models/project";
import { OpenProjectMenu } from "../project/openProject";
import { CreateProjectMenu } from "../project/createProject";
import { ExportProjectFileMenu } from "../project/exportProjectFile";
import { ImportProjectFileMenu } from "../project/importProjectFile/ImportProjectFileMenu";
import { ExportLibraryFileMenu } from "../project/exportLibraryFile/ExportLibraryFileMenu";
import { ImportFileLibraryMenu } from "../project/importLibrary/ImportFileLibraryMenu";
import { ProjectMenuBox } from "../../../compLibrary/box/menus";
import { TextResources } from "../../../assets/text";
import { useCallback, useRef } from "react";
import { setProjectMenuVisibility } from "../project/redux/actions";
import { useOutsideClick } from "./hooks/useOutsideClick";
import { activeMenuSelector, commonStateSelector, projectStateSelector } from "../../../redux/store/";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import { CommitProjectMenu } from "../project/commitProject";
import { CreateSubProjectMenu } from "../project/createSubProject";
import { useSelectedFlowElements } from "../../../helpers/UseSelectedFlowElements";
import { ProjectNameBox } from "./styled";
import { Settings } from "../../../assets/icons/header";

/**
 * Component for the Project Menu.
 * @returns a menu for the Project in the header of Mimir.
 */
const ProjectMenu = () => {
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
        <GetMenuElement type={TextResources.Account_Commit} onClick={() => Click.OnCommit(dispatch, projectState)} />
        <GetMenuElement type={TextResources.Account_SubProject_Create} onClick={() => Click.OnCreateSubprojectClick(dispatch)} />
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
      />
      <CreateSubProjectMenu nodeIds={selectedNodeIds} edgeIds={selectedEdgeIds} />
    </>
  );
};

export default ProjectMenu;
