import { Button } from "compLibrary/buttons/standard";
import { ButtonBox } from "compLibrary/buttons/ButtonBox";
import { Modal } from "compLibrary/modal/Modal";
import { RightArrowIcon } from "assets/icons/arrow";
import { TextResources } from "assets/text/TextResources";
import { InfoModalContent } from "compLibrary/modal/variants/info/InfoModalContent";

interface CloseProjectDialogProps {
    open: boolean;
    onSaveProject: () => void;
    onExit: () => void;
}

export const SaveProjectDialog = ({ open, onSaveProject, onExit }: CloseProjectDialogProps) => {
    return (
        <Modal isBlurred isOpen={open} onExit={onExit}>
            <InfoModalContent title={TextResources.PROJECT_SAVE}>
                <p>{TextResources.PROJECT_CLOSE_LABEL}</p>
                <ButtonBox>
                    <Button onClick={onExit} text={TextResources.CANCEL} />
                    <Button onClick={onSaveProject} text={TextResources.PROJECT_SAVE} icon={RightArrowIcon} />
                </ButtonBox>
            </InfoModalContent>
        </Modal>
    );
};
