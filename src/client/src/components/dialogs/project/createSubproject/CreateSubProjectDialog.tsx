import { Button } from "compLibrary/buttons/standard";
import { ButtonBox } from "compLibrary/buttons/ButtonBox";
import { CreateSubProjectIcon } from "assets/icons/project";
import { Modal } from "compLibrary/modal/Modal";
import { InfoModalContent } from "compLibrary/modal/variants/info/InfoModalContent";
import { TextResources } from "assets/text/TextResources";
import { ChangeEvent, useState } from "react";
import { Input, Label } from "compLibrary/input/text";

interface CreateSubProjectDialogProps {
  open: boolean;
  onCreateSubProject: (name: string) => void;
  onExit: () => void;
}

export const CreateSubProjectDialog = ({ open, onCreateSubProject, onExit }: CreateSubProjectDialogProps) => {
  const [projectName, setProjectName] = useState(undefined);

  return (
    <Modal isBlurred isOpen={open} onExit={onExit}>
      <InfoModalContent title={TextResources.SUBPROJECT_SAVE}>
        <Label>{TextResources.PROJECT_NAME}</Label>
        <Input
          onChange={(e: ChangeEvent<HTMLInputElement>) => setProjectName(e.target.value)}
          inputType="text"
          placeholder={TextResources.PROJECT_NAME_NEW}
          value={projectName}
        />
        <ButtonBox>
          <Button onClick={onExit} text={TextResources.CANCEL} />
          <Button
            disabled={projectName != null}
            onClick={() => onCreateSubProject(projectName)}
            text={TextResources.SAVE_SUBPROJECT}
            icon={CreateSubProjectIcon}
          />
        </ButtonBox>
      </InfoModalContent>
    </Modal>
  );
};
