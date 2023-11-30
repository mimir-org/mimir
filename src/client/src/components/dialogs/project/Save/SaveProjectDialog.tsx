import { Button } from "compLibrary/buttons/standard";
import { ButtonBox } from "compLibrary/buttons/ButtonBox";
import { Modal } from "compLibrary/modal/Modal";
import { SaveIcon } from "assets/icons/project";
import { TextResources } from "assets/text/TextResources";
import { InfoModalContent } from "compLibrary/modal/variants/info/InfoModalContent";

interface SaveProjectDialogProps {
  open: boolean;
  onSaveProject: () => void;
  onExit: () => void;
}

export const SaveProjectDialog = ({ open, onSaveProject, onExit }: SaveProjectDialogProps) => {
  return (
    <Modal isBlurred isOpen={open} onExit={onExit}>
      <InfoModalContent title={TextResources.PROJECT_SAVE}>
        <p>{TextResources.PROJECT_SAVE}</p>
        <ButtonBox>
          <Button onClick={onExit} text={TextResources.CANCEL} />
          <Button onClick={onSaveProject} text={TextResources.PROJECT_SAVE} icon={SaveIcon} />
        </ButtonBox>
      </InfoModalContent>
    </Modal>
  );
};
