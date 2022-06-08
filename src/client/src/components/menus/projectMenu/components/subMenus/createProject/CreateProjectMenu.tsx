import { Button } from "../../../../../../compLibrary/buttons/standard";
import { ButtonBox } from "../shared/styled/ButtonBox";
import { CreateProjectIcon } from "../../../../../../assets/icons/project";
import { Modal } from "../../../../../../compLibrary/modal/Modal";
import { InfoModalContent } from "../../../../../../compLibrary/modal/variants/info/InfoModalContent";
import { TextResources } from "../../../../../../assets/text/TextResources";
import { ChangeEvent, useState } from "react";
import { Input, Label } from "../../../../../../compLibrary/input/text";
import { OnReturnShowInstructionClick } from "../../../handlers";
import { OnProjectCreateClick } from "./handlers/OnProjectCreateClick";
import { useAppDispatch } from "../../../../../../redux/store";

export const CreateProjectMenu = () => {
  const dispatch = useAppDispatch();
  const [projectName, setProjectName] = useState("");
  const isActionDisabled = !projectName;
  const onAction = () => OnProjectCreateClick(dispatch, projectName);
  const onExit = () => OnReturnShowInstructionClick(dispatch);

  return (
    <Modal isBlurred isOpen onExit={onExit}>
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
          <Button disabled={isActionDisabled} onClick={onAction} text={TextResources.CREATE} icon={CreateProjectIcon} />
        </ButtonBox>
      </InfoModalContent>
    </Modal>
  );
};
