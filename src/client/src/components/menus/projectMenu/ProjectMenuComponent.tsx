import * as Click from "./handlers";
import * as Icons from "../../../assets/icons/project";
import { MenuElement } from "./components/MenuElement";
import { MENU_TYPE } from "../../../lib/models/project";
import { ProjectMenuBox } from "./ProjectMenuComponent.styled";
import { TextResources } from "../../../assets/text/TextResources";
import { useRef } from "react";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import { MimirProject } from "../../../lib/classes/MimirProject";
import { Dispatch, AnyAction } from "redux";

interface ProjectMenuProps {
  dispatch: Dispatch;
  project: MimirProject;
  activeMenu: string;
  setIsUserMenuOpen: (value: boolean) => void;
}

/**
 * Component for the Project Menu.
 * @returns a menu for the Project in the header of Mimir.
 */
const ProjectMenuComponent = ({ dispatch, project, activeMenu, setIsUserMenuOpen }: ProjectMenuProps) => {
  const hasActiveProject = project && project.id;
  const hasSelectedNodes = false;

  const menuRef = useRef(null);

  const projectMenuAction = (callback: () => void) => {
    setIsUserMenuOpen(false);
    callback();
  };

  useOutsideClick(menuRef, () => setIsUserMenuOpen(false));
  const convertProjectText = project?.isSubProject
    ? TextResources.MAKE_DISABLE_SUBPROJECT
    : TextResources.MAKE_AVAILABLE_SUBPROJECT;

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
        onClick={() => projectMenuAction(() => alert("not yet implemented"))}
        disabled={!hasActiveProject}
      />
      <MenuElement
        text={TextResources.PROJECT_CLOSE}
        icon={!hasActiveProject ? Icons.CloseProjectInactiveIcon : Icons.CloseProjectIcon}
        onClick={() => projectMenuAction(() => alert("not yet implemented"))}
        disabled={!hasActiveProject}
        bottomLine
      />
      <MenuElement
        text={TextResources.PROJECT_IMPORT}
        icon={Icons.ImportProjectIcon}
        onClick={() => projectMenuAction(() => alert("not yet implemented"))}
      />
      <MenuElement
        text={TextResources.PROJECT_EXPORT}
        icon={!hasActiveProject ? Icons.ExportProjectInactiveIcon : Icons.ExportProjectIcon}
        onClick={() => projectMenuAction(() => alert("not yet implemented"))}
        disabled={!hasActiveProject}
        bottomLine
      />
      <MenuElement
        text={TextResources.SUBPROJECT_SAVE}
        icon={hasSelectedNodes ? Icons.CreateSubProjectIcon : Icons.CreateSubProjectInactiveIcon}
        onClick={() => projectMenuAction(() => alert("not yet implemented"))}
        disabled={!hasSelectedNodes}
      />

      <MenuElement
        text={convertProjectText}
        icon={Icons.CommitProjectIcon}
        onClick={() => projectMenuAction(() => Click.OnConvertSubProject(dispatch))}
      />
    </ProjectMenuBox>
  );
};

export default ProjectMenuComponent;
