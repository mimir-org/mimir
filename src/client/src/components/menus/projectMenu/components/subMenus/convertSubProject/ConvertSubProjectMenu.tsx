import { Button } from "../../../../../../compLibrary/buttons/standard";
import { ButtonBox } from "../shared/styled/ButtonBox";
import { Modal } from "../../../../../../compLibrary/modal/Modal";
import { RightArrowIcon } from "../../../../../../assets/icons/arrow";
import { TextResources } from "../../../../../../assets/text/TextResources";
import { InfoModalContent } from "../../../../../../compLibrary/modal/variants/info/InfoModalContent";
import { OnSubProjectConvertClick, OnSubProjectReturnClick } from "./handlers";
import { useAppDispatch, useAppSelector } from "store";
import { projectSelector } from "../../../../../../redux/store/selectors";

export const ConvertSubProjectMenu = () => {
  const dispatch = useAppDispatch();
  const onExit = () => OnSubProjectReturnClick(dispatch);
  const onAction = () => OnSubProjectConvertClick(currentProject.id, dispatch);

  const currentProject = useAppSelector(projectSelector);
  const text = currentProject.subProject ? TextResources.MAKE_DISABLE_SUBPROJECT : TextResources.MAKE_AVAILABLE_SUBPROJECT;

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
