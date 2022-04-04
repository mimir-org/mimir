import * as selectors from "./helpers/selectors";
import { Button } from "../../../../../../compLibrary/buttons";
import { ButtonBox } from "../shared/styled/ButtonBox";
import { Modal } from "../../../../../../compLibrary/modal/Modal";
import { ProjectDetails } from "./components/ProjectDetails";
import { RightArrowIcon } from "../../../../../../assets/icons/arrow";
import { TextResources } from "../../../../../../assets/text/TextResources";
import { InfoModalContent } from "../../../../../../compLibrary/modal/variants/info/InfoModalContent";
import { OnReturnShowInstructionClick } from "../../../handlers";
import { OnOpenClick } from "./handlers/OnOpenClick";
import { useAppDispatch, useAppSelector, useParametricAppSelector } from "../../../../../../redux/store";
import { VIEW_TYPE } from "../../../../../../models/project";

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
  const onAction = () => OnOpenClick(projectId, currentProject, dispatch);
  const onExit = () => OnReturnShowInstructionClick(isStartPage, dispatch);

  return (
    <Modal isBlurred isOpen onExit={onExit}>
      <InfoModalContent title={TextResources.PROJECT_OPEN_LABEL}>
        <ProjectDetails projects={projectList} projectDescription={projectDescription} />
        <ButtonBox>
          <Button onClick={onExit} text={TextResources.CANCEL} />
          <Button disabled={isActionDisabled} onClick={onAction} text={TextResources.OPEN} icon={RightArrowIcon} />
        </ButtonBox>
      </InfoModalContent>
    </Modal>
  );
};
