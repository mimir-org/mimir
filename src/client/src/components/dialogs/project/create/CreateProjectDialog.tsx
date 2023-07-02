import { Button } from "../../../../compLibrary/buttons/standard";
import { ButtonBox } from "../../../../compLibrary/buttons/ButtonBox";
import { CreateProjectIcon } from "../../../../assets/icons/project";
import { Modal } from "../../../../compLibrary/modal/Modal";
import { InfoModalContent } from "../../../../compLibrary/modal/variants/info/InfoModalContent";
import { TextResources } from "../../../../assets/text/TextResources";
import { ChangeEvent, useState } from "react";
import { Input, Label } from "../../../../compLibrary/input/text";

interface CreateProjectProps {
  open: boolean;
  onCreateProject: (name: string) => void;
  onExit: () => void;
}

export const CreateProjectDialog = ({ open, onCreateProject, onExit }: CreateProjectProps) => {
  const [projectName, setProjectName] = useState("");
  const isActionDisabled = !projectName;

  return (
    <Modal isBlurred isOpen={open} onExit={onExit}>
      <InfoModalContent title={TextResources.PROJECT_CREATE}>
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
            disabled={isActionDisabled}
            onClick={() => onCreateProject(projectName)}
            text={TextResources.CREATE}
            icon={CreateProjectIcon}
          />
        </ButtonBox>
      </InfoModalContent>
    </Modal>
  );
};
