import { Dispatch } from "redux";
import { TextResources } from "../../../../../../assets/text/TextResources";
import { Button } from "../../../../../../compLibrary/buttons";
import { Modal } from "../../../../../../compLibrary/modal/Modal";
import { GetSelectedElement } from "./helpers/GetSelectedElement";
import { OnDeleteTypeClick } from "./handlers/OnDeleteTypeClick";
import { NotificationModalContent } from "../../../../../../compLibrary/modal/variants/alert/NotificationModalContent";
import { ModalButtonsWrapper } from "../styled/ModalButtonsWrapper";

interface Props {
  isOpen: boolean;
  onExit: (isOpen: boolean) => void;
  selectedElement: string;
  dispatch: Dispatch;
}

export const ConfirmDeleteType = ({ isOpen, onExit, selectedElement, dispatch }: Props) => {
  const modalDescription = TextResources.LIBRARY_DELETE_TYPE_CONFIRM + GetSelectedElement(selectedElement) + "?";

  return (
    <Modal isBlurred isOpen={isOpen} onExit={() => onExit(!isOpen)}>
      <NotificationModalContent isWarning description={modalDescription}>
        <ModalButtonsWrapper>
          <Button onClick={() => onExit(!isOpen)} text={TextResources.NO} />
          <Button
            onClick={() => {
              OnDeleteTypeClick(selectedElement, dispatch);
              onExit(!isOpen);
            }}
            text={TextResources.YES}
          />
        </ModalButtonsWrapper>
      </NotificationModalContent>
    </Modal>
  );
};
