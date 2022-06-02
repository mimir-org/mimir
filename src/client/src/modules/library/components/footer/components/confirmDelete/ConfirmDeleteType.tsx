import { Dispatch } from "redux";
import { TextResources } from "../../../../../../assets/text/TextResources";
import { Button } from "../../../../../../compLibrary/buttons";
import { Modal } from "../../../../../../compLibrary/modal/Modal";
import { NotificationModalContent } from "../../../../../../compLibrary/modal/variants/alert/NotificationModalContent";
import { ModalButtonsWrapper } from "../styled/ModalButtonsWrapper";

interface Props {
  isOpen: boolean;
  onExit: () => void;
  onDelete: () => void;
  deleteTargetName: string;
  dispatch: Dispatch;
}

export const ConfirmDeleteType = ({ isOpen, onExit, onDelete, deleteTargetName }: Props) => {
  const modalDescription = `${TextResources.DELETE_TYPE_CONFIRM} ${deleteTargetName}?`;

  return (
    <Modal isBlurred isOpen={isOpen} onExit={onExit}>
      <NotificationModalContent isWarning description={modalDescription}>
        <ModalButtonsWrapper>
          <Button onClick={onExit} text={TextResources.NO} />
          <Button onClick={onDelete} text={TextResources.YES} />
        </ModalButtonsWrapper>
      </NotificationModalContent>
    </Modal>
  );
};
