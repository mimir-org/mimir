import { Button } from "compLibrary/buttons/standard";
import { ButtonBox } from "compLibrary/buttons/ButtonBox";
import { Modal } from "compLibrary/modal/Modal";
import { RightArrowIcon } from "assets/icons/arrow";
import { TextResources } from "assets/text/TextResources";
import { InfoModalContent } from "compLibrary/modal/variants/info/InfoModalContent";

interface ConvertProjectDialogProps {
  isSubProject: boolean;
  open: boolean;
  onConvertProject: () => void;
  onExit: () => void;
}

export const ConvertProjectDialog = ({ isSubProject, open, onConvertProject, onExit }: ConvertProjectDialogProps) => {
  return (
    <Modal isBlurred isOpen={open} onExit={onExit}>
      <InfoModalContent title={isSubProject ? TextResources.MAKE_DISABLE_SUBPROJECT : TextResources.MAKE_AVAILABLE_SUBPROJECT}>
        <p style={{ whiteSpace: "pre-line" }}>{TextResources.MAKE_DISABLE_SUBPROJECT_DESCRIPTION}</p>
        <ButtonBox>
          <Button onClick={onExit} text={TextResources.CANCEL} />
          <Button
            onClick={onConvertProject}
            text={isSubProject ? TextResources.MAKE_DISABLE_SUBPROJECT : TextResources.MAKE_AVAILABLE_SUBPROJECT}
            icon={RightArrowIcon}
          />
        </ButtonBox>
      </InfoModalContent>
    </Modal>
  );
};
