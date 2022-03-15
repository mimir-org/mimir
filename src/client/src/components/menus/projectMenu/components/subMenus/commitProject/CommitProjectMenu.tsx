import * as selectors from "./helpers/selectors";
import { Button } from "../../../../../../compLibrary/buttons";
import { ButtonBox } from "../shared/styled/ButtonBox";
import { CommitProjectIcon } from "../../../../../../assets/icons/project";
import { Dropdown } from "../../../../../../compLibrary/dropdown/mimir";
import { Label } from "../../../../../../compLibrary/input/text";
import { MENU_TYPE } from "../../../../../../models/project";
import { Modal } from "../../../../../../compLibrary/modal/Modal";
import { InfoModalContent } from "../../../../../../compLibrary/modal/variants/info/InfoModalContent";
import { TextResources } from "../../../../../../assets/text";
import { useState } from "react";
import { CollaborationPartner, ModuleDescription } from "../../../../../../models";
import { OnCommitProjectClick, OnReturnClick } from "./handlers";
import { useAppDispatch, useAppSelector, useParametricAppSelector } from "../../../../../../redux/store";

export const CommitProjectMenu = () => {
  const dispatch = useAppDispatch();
  const parsers = useAppSelector(selectors.commonStateParsersSelector);
  const projectId = useAppSelector(selectors.projectIdSelector);
  const isSubProject = useAppSelector(selectors.projectIsSubProjectSelector);
  const collaborationPartners = useAppSelector(selectors.commonStateCollaborationPartnersSelector);
  const [parser, setParser] = useState(parsers[0]);
  const [collaborationPartner, setCollaborationPartner] = useState(collaborationPartners[0]);
  const isOpen = useParametricAppSelector(selectors.isActiveMenuSelector, MENU_TYPE.COMMIT_PROJECT) && !isSubProject;
  const isActionDisabled = !(collaborationPartner && parser && projectId);
  const onAction = () => OnCommitProjectClick(dispatch, projectId, parser.id, collaborationPartner.domain);
  const onExit = () => OnReturnClick(dispatch);

  return (
    <Modal isBlurred isOpen={isOpen} onExit={onExit}>
      <InfoModalContent title={TextResources.Project_Commit_Project}>
        <Label>{TextResources.Project_Commit_Collaboration_Partner}</Label>
        <Dropdown
          label="Collaboration partner"
          valueProp="name"
          items={collaborationPartners}
          keyProp="id"
          onChange={(item: CollaborationPartner) => setCollaborationPartner(item)}
        />
        <Label>{TextResources.Project_Commit_Parser}</Label>
        <Dropdown
          label="Collaboration partner"
          valueProp="name"
          items={parsers}
          keyProp="id"
          onChange={(item: ModuleDescription) => setParser(item)}
        />
        <ButtonBox>
          <Button onClick={onExit} text={TextResources.Project_Cancel} />
          <Button disabled={isActionDisabled} onClick={onAction} text={TextResources.Project_Commit} icon={CommitProjectIcon} />
        </ButtonBox>
      </InfoModalContent>
    </Modal>
  );
};
