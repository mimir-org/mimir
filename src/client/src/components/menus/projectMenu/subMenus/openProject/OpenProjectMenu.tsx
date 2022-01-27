import { Button } from "../../../../../compLibrary/buttons";
import { ButtonBox } from "../styled";
import { Modal } from "../../../modal/Modal";
import { ProjectDetails } from ".";
import { RightArrowIcon } from "../../../../../assets/icons/arrow";
import { TextResources } from "../../../../../assets/text";
import { MENU_TYPE, VIEW_TYPE } from "../../../../../models/project";
import { OnOpen, OnReturn } from "./handlers";
import {
  isActiveMenuSelector,
  isActiveViewSelector,
  projectListSelector,
  projectSelector,
  useAppDispatch,
  useAppSelector,
  useParametricAppSelector,
} from "../../../../../redux/store";

/**
 * Open project menu component
 * @returns a menu for selecting a project or create a new one.
 */
export const OpenProjectMenu = () => {
  const dispatch = useAppDispatch();
  const currentProject = useAppSelector(projectSelector);
  const projectList = useAppSelector(projectListSelector);
  const isOpen = useParametricAppSelector(isActiveMenuSelector, MENU_TYPE.OPEN_PROJECT_MENU);
  const isStartPage = useParametricAppSelector(isActiveViewSelector, VIEW_TYPE.STARTPAGE);
  const selectedProject = projectList?.find((x) => x.selected);
  const projectId = selectedProject?.id;
  const projectDescription = selectedProject?.description;
  const onExit = () => OnReturn(dispatch);
  const onAction = () => OnOpen(projectId, currentProject, dispatch);
  const isActionDisabled = !projectId || projectId === "";

  return (
    <Modal title={TextResources.Project_Open_Label} isOpen={isOpen} onExit={onExit} top={isStartPage && "20%"}>
      <ProjectDetails projects={projectList} projectDescription={projectDescription} />
      <ButtonBox>
        <Button onClick={onExit} text={TextResources.Project_Cancel} />
        <Button disabled={isActionDisabled} onClick={onAction} text={TextResources.Project_Open} icon={RightArrowIcon} />
      </ButtonBox>
    </Modal>
  );
};

export default OpenProjectMenu;
