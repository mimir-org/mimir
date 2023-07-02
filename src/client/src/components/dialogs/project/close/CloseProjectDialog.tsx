import { Button } from "compLibrary/buttons/standard";
import { ButtonBox } from "compLibrary/buttons/ButtonBox";
import { Modal } from "compLibrary/modal/Modal";
import { RightArrowIcon } from "assets/icons/arrow";
import { TextResources } from "assets/text/TextResources";
import { InfoModalContent } from "compLibrary/modal/variants/info/InfoModalContent";

interface CloseProjectDialogProps {
  open: boolean;
  onCloseProject: () => void;
  onExit: () => void;
}

export const CloseProjectDialog = ({ open, onCloseProject, onExit }: CloseProjectDialogProps) => {
  return (
    <Modal isBlurred isOpen={open} onExit={onExit}>
      <InfoModalContent title={TextResources.PROJECT_CLOSE}>
        <p>{TextResources.PROJECT_CLOSE_LABEL}</p>
        <ButtonBox>
          <Button onClick={onExit} text={TextResources.CANCEL} />
          <Button onClick={onCloseProject} text={TextResources.PROJECT_CLOSE} icon={RightArrowIcon} />
        </ButtonBox>
      </InfoModalContent>
    </Modal>
  );
};
