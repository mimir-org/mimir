import * as Click from "./handlers";
import * as Icons from "../../../assets/icons/project";
import { MenuElement } from "../../../compLibrary/menu/MenuElement";
import { MENU_TYPE } from "../../../models/project";
import { ProjectMenuBox } from "./ProjectMenuComponent.styled";
import { TextResources } from "../../../assets/text/TextResources";
import { useRef } from "react";
import { useOutsideClick } from "../../../hooks/useOutsideClick";
import { activeMenuSelector, projectSelector } from "../../../redux/store";
import { useAppDispatch, useAppSelector } from "store";
import { GetSelectedFlowNodes } from "../../../helpers/Selected";
import { DialogType } from "lib";
import { setDialogType } from "store/reducers/commonReducer";

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
  const selectedFlowNodes = GetSelectedFlowNodes();
  const hasSelectedNodes = selectedFlowNodes.length > 0;

  const menuRef = useRef(null);

  const projectMenuAction = (callback: () => void) => {
    setIsUserMenuOpen(false);
    callback();
  };

  const OnOpenClick = (dialog: DialogType) => {
    // dispatch(changeActiveMenu(MENU_TYPE.OPEN_PROJECT_MENU));
    dispatch(setDialogType({ dialog: dialog }));
  };

  useOutsideClick(menuRef, () => setIsUserMenuOpen(false));
  const convertProjectText = project?.subProject
    ? TextResources.MAKE_DISABLE_SUBPROJECT
    : TextResources.MAKE_AVAILABLE_SUBPROJECT;

  return (
    <ProjectMenuBox ref={menuRef} id={MENU_TYPE.PROJECT_MENU} hidden={!!activeMenu}>
      <MenuElement
        text={TextResources.PROJECT_OPEN}
        icon={Icons.OpenProjectIcon}
        onClick={() => projectMenuAction(() => OnOpenClick(DialogType.Project))}
      />
      <MenuElement
        text={TextResources.PROJECT_CREATE}
        icon={Icons.CreateProjectIcon}
        onClick={() => projectMenuAction(() => OnOpenClick(DialogType.CreateProject))}
      />
      <MenuElement
        text={TextResources.PROJECT_SAVE}
        icon={!hasActiveProject ? Icons.SaveInactiveIcon : Icons.SaveIcon}
        onClick={() => projectMenuAction(() => Click.OnSaveProjectClick(dispatch, project))}
        disabled={!hasActiveProject}
      />
      <MenuElement
        text={TextResources.PROJECT_CLOSE}
        icon={!hasActiveProject ? Icons.CloseProjectInactiveIcon : Icons.CloseProjectIcon}
        onClick={() => projectMenuAction(() => Click.OnCloseProjectClick(dispatch))}
        disabled={!hasActiveProject}
        bottomLine
      />
      <MenuElement
        text={TextResources.PROJECT_IMPORT}
        icon={Icons.ImportProjectIcon}
        onClick={() => projectMenuAction(() => OnOpenClick(DialogType.ImportProject))}
      />
      <MenuElement
        text={TextResources.PROJECT_EXPORT}
        icon={!hasActiveProject ? Icons.ExportProjectInactiveIcon : Icons.ExportProjectIcon}
        onClick={() => projectMenuAction(() => Click.OnExportProjectFile(dispatch))}
        disabled={!hasActiveProject}
        bottomLine
      />
      <MenuElement
        text={TextResources.SUBPROJECT_SAVE}
        icon={hasSelectedNodes ? Icons.CreateSubProjectIcon : Icons.CreateSubProjectInactiveIcon}
        onClick={() => projectMenuAction(() => Click.OnCreateSubProject(dispatch))}
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
