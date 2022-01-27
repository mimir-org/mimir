import { Button } from "../../../../../compLibrary/buttons";
import { ButtonBox } from "../styled";
import { CreateProjectIcon } from "../../../../../assets/icons/project";
import { MENU_TYPE } from "../../../../../models/project";
import { Modal } from "../../../modal/Modal";
import { TextResources } from "../../../../../assets/text";
import { ChangeEvent, useState } from "react";
import { Input, Label } from "../../../../../compLibrary/input/text";
import { OnProjectCreateClick, OnReturnClick } from "./handlers";
import { isActiveMenuSelector, useAppDispatch, useParametricAppSelector } from "../../../../../redux/store";

export const CreateProjectMenu = () => {
  const dispatch = useAppDispatch();
  const isOpen = useParametricAppSelector(isActiveMenuSelector, MENU_TYPE.CREATE_PROJECT_MENU);
  const [projectName, setProjectName] = useState("");
  const onExit = () => OnReturnClick(dispatch);
  const onAction = () => OnProjectCreateClick(dispatch, projectName);
  const isActionDisabled = !projectName;

  return (
    <Modal title={TextResources.Project_CreateProject} isOpen={isOpen} onExit={onExit}>
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
    </Modal>
  );
};

export default CreateProjectMenu;
