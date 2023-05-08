import { Button } from "compLibrary/buttons/standard";
import { ButtonBox } from "compLibrary/buttons/ButtonBox";
import { Modal } from "compLibrary/modal/Modal";
import { RightArrowIcon } from "assets/icons/arrow";
import { TextResources } from "assets/text/TextResources";
import { InfoModalContent } from "compLibrary/modal/variants/info/InfoModalContent";
import { OnSubProjectConvertClick, OnSubProjectReturnClick } from "./handlers";
import { projectStateSelector, useAppDispatch, useAppSelector } from "store";
import { ProjectState } from "store/reducers/projectReducer";

export const ConvertSubProjectMenu = () => {
  const dispatch = useAppDispatch();
  const onExit = () => OnSubProjectReturnClick(dispatch);
  const onAction = () => OnSubProjectConvertClick(currentProject.id, dispatch);

  const currentProject = useAppSelector<ProjectState>(projectStateSelector)?.project;
  const text = currentProject?.subProject ? TextResources.MAKE_DISABLE_SUBPROJECT : TextResources.MAKE_AVAILABLE_SUBPROJECT;

  return (
    <Modal isBlurred isOpen onExit={onExit}>
      <InfoModalContent title={text}>
        <p style={{ whiteSpace: "pre-line" }}>{TextResources.MAKE_DISABLE_SUBPROJECT_DESCRIPTION}</p>
        <ButtonBox>
          <Button onClick={onExit} text={TextResources.CANCEL} />
          <Button onClick={onAction} text={text} icon={RightArrowIcon} />
        </ButtonBox>
      </InfoModalContent>
    </Modal>
  );
};
