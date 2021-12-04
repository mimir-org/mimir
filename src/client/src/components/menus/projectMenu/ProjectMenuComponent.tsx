import * as Click from "./handlers";
import * as Icons from "../../../assets/icons/project";
import { useCallback, useRef } from "react";
import { MENU_TYPE } from "../../../models/project";
import { TextResources } from "../../../assets/text";
import { setProjectMenuVisibility } from "../projectMenu/subMenus/redux/actions";
import { useOutsideClick } from "./hooks/useOutsideClick";
import { activeMenuSelector, commonStateSelector, projectStateSelector } from "../../../redux/store";
import { useAppDispatch, useAppSelector } from "../../../redux/store/hooks";
import { useSelectedFlowElements } from "../../../helpers/UseSelectedFlowElements";
import { ProjectMenuBox } from "../styled";
import { ProjectSubMenus, MenuElement } from "./";

/**
 * Component for the Project Menu.
 * @returns a menu for the Project in the header of Mimir.
 */
const ProjectMenuComponent = () => {
  const [selectedNodeIds, selectedEdgeIds] = useSelectedFlowElements();
  const dispatch = useAppDispatch();
  const projectState = useAppSelector(projectStateSelector);
  const commonState = useAppSelector(commonStateSelector);
  const activeMenu = useAppSelector(activeMenuSelector);
  const menuRef = useRef(null);

  const onOutsideClick = useCallback(() => !activeMenu && dispatch(setProjectMenuVisibility(false)), [activeMenu, dispatch]);
  useOutsideClick(menuRef, onOutsideClick);

  return (
    <>
      <ProjectMenuBox ref={menuRef} id={MENU_TYPE.PROJECT_MENU}>
        <MenuElement
          text={TextResources.Project_OpenProject}
          icon={Icons.OpenProjectIcon}
          onClick={() => Click.OnOpenClick(dispatch)}
        />
        <MenuElement
          text={TextResources.Project_CreateProject}
          icon={Icons.CreateProjectIcon}
          onClick={() => Click.OnCreate(dispatch)}
        />
        <MenuElement
          text={TextResources.Project_Save_Label}
          icon={Icons.SaveIcon}
          onClick={() => Click.OnSave(dispatch, projectState)}
          bottomLine
        />
        <MenuElement
          text={TextResources.Project_Import}
          icon={Icons.ImportProjectIcon}
          onClick={() => Click.OnImportProject(dispatch)}
        />
        <MenuElement
          text={TextResources.Project_Export}
          icon={Icons.ExportProjectIcon}
          onClick={() => Click.OnSaveFile(dispatch)}
          bottomLine
        />
        {/* <MenuElement
          text={TextResources.Project_Commit_Project}
          icon={Icons.CommitProjectIcon}
          onClick={() => Click.OnCommit(dispatch)}
          disabled={!projectState?.project?.isSubProject}
        /> */}
        {/* <MenuElement
          text={TextResources.Project_SubProject_Save}
          icon={Icons.CreateSubProjectIcon}
          onClick={() => Click.OnCreateSubProject(dispatch)}
          disabled={!selectedNodeIds}
        /> */}

        <MenuElement
          text={TextResources.Project_Import_LibraryTypes}
          icon={Icons.ImportLibraryIcon}
          onClick={() => Click.OnImportLibrary(dispatch)}
        />

        <MenuElement
          text={TextResources.Project_Export_LibraryTypes}
          icon={Icons.ExportLibraryIcon}
          onClick={() => Click.OnSaveLibrary(dispatch)}
        />
      </ProjectMenuBox>

      <ProjectSubMenus
        projectState={projectState}
        commonState={commonState}
        selectedNodeIds={selectedNodeIds}
        selectedEdgeIds={selectedEdgeIds}
        dispatch={dispatch}
      />
    </>
  );
};

export default ProjectMenuComponent;
