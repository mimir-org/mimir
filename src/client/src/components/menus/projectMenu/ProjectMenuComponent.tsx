import * as Click from "./handlers";
import * as Icons from "../../../assets/icons/project";
import { MENU_TYPE } from "../../../models/project";
import { ProjectMenuBox } from "../styled";
import { TextResources } from "../../../assets/text";
import { MenuElement } from "./";
import { activeMenuSelector, projectSelector, useAppDispatch, useAppSelector } from "../../../redux/store";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import { setProjectMenuVisibility } from "./subMenus/redux/menuSlice";
import { useCallback, useRef } from "react";

/**
 * Component for the Project Menu.
 * @returns a menu for the Project in the header of Mimir.
 */
const ProjectMenuComponent = () => {
  const dispatch = useAppDispatch();
  const project = useAppSelector(projectSelector);
  const activeMenu = useAppSelector(activeMenuSelector);
  const isNoActiveProject = !project;

  const menuRef = useRef(null);
  const onOutsideClick = useCallback(() => !activeMenu && dispatch(setProjectMenuVisibility(false)), [activeMenu, dispatch]);
  useOutsideClick(menuRef, onOutsideClick);

  return (
    <>
      <ProjectMenuBox ref={menuRef} id={MENU_TYPE.PROJECT_MENU} hidden={!!activeMenu}>
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
          icon={isNoActiveProject ? Icons.SaveInactiveIcon : Icons.SaveIcon}
          onClick={() => Click.OnSave(dispatch, project)}
          disabled={isNoActiveProject}
          bottomLine
        />
        <MenuElement
          text={TextResources.Project_Import}
          icon={Icons.ImportProjectIcon}
          onClick={() => Click.OnImportProject(dispatch)}
        />
        <MenuElement
          text={TextResources.Project_Export}
          icon={isNoActiveProject ? Icons.ExportProjectInactiveIcon : Icons.ExportProjectIcon}
          onClick={() => Click.OnSaveFile(dispatch)}
          disabled={isNoActiveProject}
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
    </>
  );
};

export default ProjectMenuComponent;
