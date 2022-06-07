import * as selectors from "./helpers/selectors";
import { Button } from "../../../../../../compLibrary/buttons/standar";
import { ButtonBox } from "../shared/styled/ButtonBox";
import { CreateSubProjectIcon } from "../../../../../../assets/icons/project";
import { Modal } from "../../../../../../compLibrary/modal/Modal";
import { InfoModalContent } from "../../../../../../compLibrary/modal/variants/info/InfoModalContent";
import { TextResources } from "../../../../../../assets/text/TextResources";
import { GetSelectedFlowElementsIds } from "../../../../../../helpers/GetSelectedFlowElementsIds";
import { ChangeEvent, useState } from "react";
import { Input, Label } from "../../../../../../compLibrary/input/text";
import { OnReturnClick, OnSubProjectCreateClick } from "./handlers";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/store";

export const CreateSubProjectMenu = () => {
  const dispatch = useAppDispatch();
  const fromProjectId = useAppSelector(selectors.projectIdSelector);
  const [selectedNodeIds, selectedEdgeIds] = GetSelectedFlowElementsIds();
  const [projectName, setProjectName] = useState("");
  const isActionDisabled = !projectName;
  const onAction = () => OnSubProjectCreateClick(fromProjectId, projectName, selectedNodeIds, selectedEdgeIds, dispatch);
  const onExit = () => OnReturnClick(dispatch);

  return (
    <Modal isBlurred isOpen onExit={onExit}>
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
            disabled={isActionDisabled}
            onClick={onAction}
            text={TextResources.SAVE_SUBPROJECT}
            icon={CreateSubProjectIcon}
          />
        </ButtonBox>
      </InfoModalContent>
    </Modal>
  );
};
