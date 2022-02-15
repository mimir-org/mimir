import { Dispatch } from "redux";
import { TextResources } from "../../assets/text";
import { Button } from "../../compLibrary/buttons";
import { Modal } from "../../compLibrary/modal/Modal";
import { GetSelectedElement } from "./helpers";
import { OnDeleteTypeClick } from "./handlers";
import { NotificationModalContent } from "../../compLibrary/modal/variants/alert/NotificationModalContent";
import { ModalButtonsWrapper } from "./styled";

interface Props {
  isOpen: boolean;
  onExit: (isOpen: boolean) => void;
  selectedElement: string;
  dispatch: Dispatch;
}

const ConfirmDeleteType = ({ isOpen, onExit, selectedElement, dispatch }: Props) => {
  const modalDescription = TextResources.Library_Delete_Type_Confirm + GetSelectedElement(selectedElement) + "?";

  return (
    <Modal isBlurred isOpen={isOpen} onExit={() => onExit(!isOpen)}>
      <NotificationModalContent isWarning description={modalDescription}>
        <ModalButtonsWrapper>
          <Button onClick={() => onExit(!isOpen)} text={TextResources.Library_Delete_Type_No} />
          <Button
            onClick={() => {
              OnDeleteTypeClick(selectedElement, dispatch);
              onExit(!isOpen);
            }}
            text={TextResources.Library_Delete_Type_Yes}
          />
        </ModalButtonsWrapper>
      </NotificationModalContent>
    </Modal>
  );
};

export default ConfirmDeleteType;
