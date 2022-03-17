import * as selectors from "./helpers/selectors";
import { Button } from "../../../../../../compLibrary/buttons";
import { ButtonBox } from "../shared/styled/ButtonBox";
import { Modal } from "../../../../../../compLibrary/modal/Modal";
import { ProjectDetails } from "./components/ProjectDetails";
import { RightArrowIcon } from "../../../../../../assets/icons/arrow";
import { TextResources } from "../../../../../../assets/text/TextResources";
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
      <InfoModalContent title={TextResources.PROJECT_OPEN_LABEL} inset={isStartPage && "120px 0 0 0"}>
        <ProjectDetails projects={projectList} projectDescription={projectDescription} />
        <ButtonBox>
          <Button onClick={onExit} text={TextResources.CANCEL} />
          <Button disabled={isActionDisabled} onClick={onAction} text={TextResources.OPEN} icon={RightArrowIcon} />
        </ButtonBox>
      </InfoModalContent>
    </Modal>
  );
};
