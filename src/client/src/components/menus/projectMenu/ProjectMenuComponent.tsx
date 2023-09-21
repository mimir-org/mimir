import * as Icons from "../../../assets/icons/project";
import { MenuElement } from "../../../compLibrary/menu/MenuElement";
import { MENU_TYPE } from "../../../models/project";
import { ProjectMenuBox } from "./ProjectMenuComponent.styled";
import { TextResources } from "../../../assets/text/TextResources";
import { DialogType } from "lib";

interface Props {
  isSubProject: boolean;
  hasActiveProject: boolean;
  hasSelectedNodes: boolean;
  setIsMenuOpen: (value: boolean) => void;
  onOpenClick: (dialogType: DialogType) => void;
}

/**
 * Component for the Project Menu.
 * @returns a menu for the Project in the header of Mimir.
 */
const ProjectMenuComponent = ({ isSubProject, hasActiveProject, hasSelectedNodes, setIsMenuOpen, onOpenClick }: Props) => {
  const projectMenuAction = (callback: () => void) => {
    setIsMenuOpen(false);
    callback();
  };

  const convertProjectText = isSubProject ? TextResources.MAKE_DISABLE_SUBPROJECT : TextResources.MAKE_AVAILABLE_SUBPROJECT;

  return (
    <ProjectMenuBox id={MENU_TYPE.PROJECT_MENU} hidden={true}>
      <MenuElement
        text={TextResources.PROJECT_OPEN}
        icon={Icons.OpenProjectIcon}
        onClick={() => projectMenuAction(() => onOpenClick(DialogType.Project))}
      />
      <MenuElement
        text={TextResources.PROJECT_CREATE}
        icon={Icons.CreateProjectIcon}
        onClick={() => projectMenuAction(() => onOpenClick(DialogType.CreateProject))}
      />
      <MenuElement
        text={TextResources.PROJECT_SAVE}
        icon={!hasActiveProject ? Icons.SaveInactiveIcon : Icons.SaveIcon}
        onClick={() => projectMenuAction(() => onOpenClick(DialogType.CreateProject))}
        disabled={!hasActiveProject}
      />
      <MenuElement
        text={TextResources.PROJECT_CLOSE}
        icon={!hasActiveProject ? Icons.CloseProjectInactiveIcon : Icons.CloseProjectIcon}
        onClick={() => projectMenuAction(() => onOpenClick(DialogType.CloseProject))}
        disabled={!hasActiveProject}
        bottomLine
      />
      <MenuElement
        text={TextResources.PROJECT_IMPORT}
        icon={Icons.ImportProjectIcon}
        onClick={() => projectMenuAction(() => onOpenClick(DialogType.ImportProject))}
      />
      <MenuElement
        text={TextResources.PROJECT_EXPORT}
        icon={!hasActiveProject ? Icons.ExportProjectInactiveIcon : Icons.ExportProjectIcon}
        onClick={() => projectMenuAction(() => onOpenClick(DialogType.ExportProject))}
        disabled={!hasActiveProject}
        bottomLine
      />
      <MenuElement
        text={TextResources.SUBPROJECT_SAVE}
        icon={hasSelectedNodes ? Icons.CreateSubProjectIcon : Icons.CreateSubProjectInactiveIcon}
        onClick={() => projectMenuAction(() => onOpenClick(DialogType.CreateSubProject))}
        disabled={!hasSelectedNodes}
      />
      <MenuElement
        text={convertProjectText}
        icon={!isSubProject && hasActiveProject ? Icons.CommitProjectIcon : Icons.CommitProjectInactiveIcon}
        onClick={() => projectMenuAction(() => onOpenClick(DialogType.ConvertProject))}
        disabled={isSubProject || !hasActiveProject}
      />
    </ProjectMenuBox>
  );
};

export default ProjectMenuComponent;
