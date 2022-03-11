import { Button } from "../../../../../../compLibrary/buttons";
import { ButtonBox } from "../shared/styled/ButtonBox";
import { CreateSubProjectIcon } from "../../../../../../assets/icons/project";
import { MENU_TYPE } from "../../../../../../models/project";
import { Modal } from "../../../../../../compLibrary/modal/Modal";
import { InfoModalContent } from "../../../../../../compLibrary/modal/variants/info/InfoModalContent";
import { TextResources } from "../../../../../../assets/text/TextResources";
import { useSelectedFlowElements } from "../../../../../../helpers";
import { ChangeEvent, useState } from "react";
import { Input, Label } from "../../../../../../compLibrary/input/text";
import { OnReturnClick, OnSubProjectCreateClick } from "./handlers";
import {
  isActiveMenuSelector,
  projectIdSelector,
  useAppDispatch,
  useAppSelector,
  useParametricAppSelector,
} from "../../../../../../redux/store";

export const CreateSubProjectMenu = () => {
  const dispatch = useAppDispatch();
  const fromProjectId = useAppSelector(projectIdSelector);
  const [selectedNodeIds, selectedEdgeIds] = useSelectedFlowElements();
  const isOpen = useParametricAppSelector(isActiveMenuSelector, MENU_TYPE.CREATE_SUB_PROJECT_MENU);
  const [projectName, setProjectName] = useState("");
  const isActionDisabled = !projectName;
  const onExit = () => OnReturnClick(dispatch);
  const onAction = () => OnSubProjectCreateClick(fromProjectId, projectName, selectedNodeIds, selectedEdgeIds, dispatch);

  return (
    <Modal isBlurred isOpen={isOpen} onExit={onExit}>
      <InfoModalContent title={TextResources.PROJECT_SUBPROJECT_SAVE}>
        <Label>{TextResources.PROJECT_NAME}</Label>
        <Input
          onChange={(e: ChangeEvent<HTMLInputElement>) => setProjectName(e.target.value)}
          inputType="text"
          placeholder={TextResources.PROJECT_NAME_PLACEHOLDER}
          value={projectName}
        />
        <ButtonBox>
          <Button onClick={onExit} text={TextResources.CANCEL} />
          <Button
            disabled={isActionDisabled}
            onClick={onAction}
            text={TextResources.PROJECT_SUBPROJECT}
            icon={CreateSubProjectIcon}
          />
        </ButtonBox>
      </InfoModalContent>
    </Modal>
  );
};
