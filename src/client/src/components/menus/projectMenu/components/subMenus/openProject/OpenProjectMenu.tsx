import * as selectors from "./helpers/selectors";
import { Button } from "../../../../../../compLibrary/buttons";
import { ButtonBox } from "../shared/styled/ButtonBox";
import { Modal } from "../../../../../../compLibrary/modal/Modal";
import { ProjectDetails } from "./components/ProjectDetails";
import { RightArrowIcon } from "../../../../../../assets/icons/arrow";
import { TextResources } from "../../../../../../assets/text";
import { VIEW_TYPE } from "../../../../../../models/project";
import { InfoModalContent } from "../../../../../../compLibrary/modal/variants/info/InfoModalContent";
import { OnReturnShowInstructionClick } from "../../../handlers";
import { OnOpen } from "./handlers";
import { useAppDispatch, useAppSelector, useParametricAppSelector } from "../../../../../../redux/store";

/**
 * Open project menu component
 * @returns a menu for selecting a project or create a new one.
 */
export const OpenProjectMenu = () => {
  const dispatch = useAppDispatch();
  const currentProject = useAppSelector(selectors.projectSelector);
  const projectList = useAppSelector(selectors.projectListSelector);
  const isStartPage = useParametricAppSelector(selectors.isActiveViewSelector, VIEW_TYPE.STARTPAGE);
  const selectedProject = projectList?.find((x) => x.selected);
  const projectId = selectedProject?.id;
  const projectDescription = selectedProject?.description;
  const isActionDisabled = !projectId || projectId === "";
  const onAction = () => OnOpen(projectId, currentProject, dispatch);
  const onExit = () => OnReturnShowInstructionClick(dispatch);

  return (
    <Modal isBlurred isOpen onExit={onExit}>
      <InfoModalContent title={TextResources.Project_Open_Label} inset={isStartPage && "120px 0 0 0"}>
        <ProjectDetails projects={projectList} projectDescription={projectDescription} />
        <ButtonBox>
          <Button onClick={onExit} text={TextResources.Project_Cancel} />
          <Button disabled={isActionDisabled} onClick={onAction} text={TextResources.Project_Open} icon={RightArrowIcon} />
        </ButtonBox>
      </InfoModalContent>
    </Modal>
  );
};
