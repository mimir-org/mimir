import { Button } from "../../../../../../compLibrary/buttons";
import { ButtonBox } from "../shared/styled/ButtonBox";
import { CreateProjectIcon } from "../../../../../../assets/icons/project";
import { Modal } from "../../../../../../compLibrary/modal/Modal";
import { InfoModalContent } from "../../../../../../compLibrary/modal/variants/info/InfoModalContent";
import { TextResources } from "../../../../../../assets/text";
import { ChangeEvent, useState } from "react";
import { Input, Label } from "../../../../../../compLibrary/input/text";
import { OnReturnShowInstructionClick } from "../../../handlers";
import { OnProjectCreateClick } from "./handlers";
import { useAppDispatch } from "../../../../../../redux/store";

export const CreateProjectMenu = () => {
  const dispatch = useAppDispatch();
  const [projectName, setProjectName] = useState("");
  const isActionDisabled = !projectName;
  const onAction = () => OnProjectCreateClick(dispatch, projectName);
  const onExit = () => OnReturnShowInstructionClick(dispatch);

  return (
    <Modal isBlurred isOpen onExit={onExit}>
      <InfoModalContent title={TextResources.Project_CreateProject}>
        <Label>{TextResources.Project_Name}</Label>
        <Input
          onChange={(e: ChangeEvent<HTMLInputElement>) => setProjectName(e.target.value)}
          inputType="text"
          placeholder={TextResources.Project_Name_Placeholder}
          value={projectName}
        />
        <ButtonBox>
          <Button onClick={onExit} text={TextResources.Project_Cancel} />
          <Button disabled={isActionDisabled} onClick={onAction} text={TextResources.Project_Create} icon={CreateProjectIcon} />
        </ButtonBox>
      </InfoModalContent>
    </Modal>
  );
};
