import * as selectors from "./helpers/selectors";
import { Button } from "../../../../../../compLibrary/buttons";
import { ButtonBox } from "../shared/styled/ButtonBox";
import { CreateSubProjectIcon } from "../../../../../../assets/icons/project";
import { MENU_TYPE } from "../../../../../../models/project";
import { Modal } from "../../../../../../compLibrary/modal/Modal";
import { InfoModalContent } from "../../../../../../compLibrary/modal/variants/info/InfoModalContent";
import { TextResources } from "../../../../../../assets/text";
import { useSelectedFlowElements } from "../../../../../../helpers";
import { ChangeEvent, useState } from "react";
import { Input, Label } from "../../../../../../compLibrary/input/text";
import { OnReturnClick, OnSubProjectCreateClick } from "./handlers";
import { useAppDispatch, useAppSelector, useParametricAppSelector } from "../../../../../../redux/store";

export const CreateSubProjectMenu = () => {
  const dispatch = useAppDispatch();
  const fromProjectId = useAppSelector(selectors.projectIdSelector);
  const [selectedNodeIds, selectedEdgeIds] = useSelectedFlowElements();
  const isOpen = useParametricAppSelector(selectors.isActiveMenuSelector, MENU_TYPE.CREATE_SUB_PROJECT_MENU);
  const [projectName, setProjectName] = useState("");
  const isActionDisabled = !projectName;
  const onAction = () => OnSubProjectCreateClick(fromProjectId, projectName, selectedNodeIds, selectedEdgeIds, dispatch);
  const onExit = () => OnReturnClick(dispatch);

  return (
    <Modal isBlurred isOpen={isOpen} onExit={onExit}>
      <InfoModalContent title={TextResources.Project_SubProject_Save}>
        <Label>{TextResources.Project_Name}</Label>
        <Input
          onChange={(e: ChangeEvent<HTMLInputElement>) => setProjectName(e.target.value)}
          inputType="text"
          placeholder={TextResources.Project_Name_Placeholder}
          value={projectName}
        />
        <ButtonBox>
          <Button onClick={onExit} text={TextResources.Project_Cancel} />
          <Button
            disabled={isActionDisabled}
            onClick={onAction}
            text={TextResources.Project_SubProject}
            icon={CreateSubProjectIcon}
          />
        </ButtonBox>
      </InfoModalContent>
    </Modal>
  );
};
