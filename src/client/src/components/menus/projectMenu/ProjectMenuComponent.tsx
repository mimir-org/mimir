import * as Click from "./handlers";
import * as Icons from "../../../assets/icons/project";
import { MenuElement } from "./components/MenuElement";
import { MENU_TYPE } from "../../../models/project";
import { ProjectMenuBox } from "./ProjectMenuComponent.styled";
import { TextResources } from "../../../assets/text/TextResources";
import { useRef } from "react";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import { useSelectedFlowElements } from "../../../helpers";
import { activeMenuSelector, projectSelector, useAppDispatch, useAppSelector } from "../../../redux/store";

interface Props {
  setIsUserMenuOpen: (value: boolean) => void;
}

/**
 * Component for the Project Menu.
 * @returns a menu for the Project in the header of Mimir.
 */
const ProjectMenuComponent = ({ setIsUserMenuOpen }: Props) => {
  const dispatch = useAppDispatch();
  const project = useAppSelector(projectSelector);
  const activeMenu = useAppSelector(activeMenuSelector);
  const hasActiveProject = project && project.id;
  const [selectedNodeIds] = useSelectedFlowElements();
  const menuRef = useRef(null);

  const projectMenuAction = (callback: () => void) => {
    setIsUserMenuOpen(false);
    callback();
  };

  useOutsideClick(menuRef, () => setIsUserMenuOpen(false));

  return (
    <ProjectMenuBox ref={menuRef} id={MENU_TYPE.PROJECT_MENU} hidden={!!activeMenu}>
      <MenuElement
        text={TextResources.PROJECT_OPEN}
        icon={Icons.OpenProjectIcon}
        onClick={() => projectMenuAction(() => Click.OnOpenClick(dispatch))}
      />
      <MenuElement
        text={TextResources.PROJECT_CREATE}
        icon={Icons.CreateProjectIcon}
        onClick={() => projectMenuAction(() => Click.OnCreateClick(dispatch))}
      />
      <MenuElement
        text={TextResources.PROJECT_SAVE}
        icon={!hasActiveProject ? Icons.SaveInactiveIcon : Icons.SaveIcon}
        onClick={() => projectMenuAction(() => Click.OnSaveProjectClick(dispatch, project))}
        disabled={!hasActiveProject}
      />
      <MenuElement
        text={TextResources.PROJECT_CLOSE}
        icon={!hasActiveProject ? Icons.CloseInactiveProjectIcon : Icons.CloseProjectIcon}
        onClick={() => projectMenuAction(() => Click.OnCloseProjectClick(dispatch))}
        disabled={!hasActiveProject}
        bottomLine
      />
      <MenuElement
        text={TextResources.PROJECT_IMPORT}
        icon={Icons.ImportProjectIcon}
        onClick={() => projectMenuAction(() => Click.OnImportProjectFile(dispatch))}
      />
      <MenuElement
        text={TextResources.PROJECT_EXPORT}
        icon={!hasActiveProject ? Icons.ExportProjectInactiveIcon : Icons.ExportProjectIcon}
        onClick={() => projectMenuAction(() => Click.OnExportProjectFile(dispatch))}
        disabled={!hasActiveProject}
        bottomLine
      />
      {/* <MenuElement
          text={TextResources.Project_Commit_Project}
          icon={Icons.CommitProjectIcon}
          onClick={() => projectMenuAction(() => Click.OnCommit(dispatch))}
          disabled={!projectState?.project?.isSubProject}
        /> */}
      <MenuElement
        text={TextResources.SUBPROJECT_SAVE}
        icon={selectedNodeIds ? Icons.CreateSubProjectIcon : Icons.CreateSubProjectInactiveIcon}
        onClick={() => projectMenuAction(() => Click.OnCreateSubProject(dispatch))}
        disabled={!selectedNodeIds}
      />
      <MenuElement
        text={TextResources.PROJECT_IMPORT_LIB_TYPES}
        icon={Icons.ImportLibraryIcon}
        onClick={() => projectMenuAction(() => Click.OnImportLibraryFile(dispatch))}
      />
      <MenuElement
        text={TextResources.PROJECT_EXPORT_LIBRARY_TYPES}
        icon={Icons.ExportLibraryIcon}
        onClick={() => projectMenuAction(() => Click.OnSaveLibraryFile(dispatch))}
      />
    </ProjectMenuBox>
  );
};

export default ProjectMenuComponent;
