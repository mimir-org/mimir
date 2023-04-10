import { Button } from "../../../../../../compLibrary/buttons/standard";
import { ButtonBox } from "../../../../../../compLibrary/buttons/ButtonBox";
import { Modal } from "../../../../../../compLibrary/modal/Modal";
import { RightArrowIcon } from "../../../../../../assets/icons/arrow";
import { TextResources } from "../../../../../../assets/text/TextResources";
import { InfoModalContent } from "../../../../../../compLibrary/modal/variants/info/InfoModalContent";
import { OnReturnShowInstructionClick } from "../../../handlers";
import { OnClose } from "./handlers";
import { useAppDispatch } from "store";
import { ViewType } from "lib";

export const CloseProjectMenu = () => {
  const dispatch = useAppDispatch();
  const onExit = () => OnReturnShowInstructionClick(dispatch, ViewType.Home);
  const onAction = () => OnClose(dispatch);

  return (
    <Modal isBlurred isOpen onExit={onExit}>
      <InfoModalContent title={TextResources.PROJECT_CLOSE}>
        <p>{TextResources.PROJECT_CLOSE_LABEL}</p>
        <ButtonBox>
          <Button onClick={onExit} text={TextResources.CANCEL} />
          <Button onClick={onAction} text={TextResources.PROJECT_CLOSE} icon={RightArrowIcon} />
        </ButtonBox>
      </InfoModalContent>
    </Modal>
  );
};
