import * as selectors from "./helpers/selectors";
import { Button } from "../../../../../../compLibrary/buttons/standard";
import { ButtonBox } from "../shared/styled/ButtonBox";
import { CommitProjectIcon } from "../../../../../../assets/icons/project";
import { Dropdown } from "../../../../../../compLibrary/dropdown/mimir/Dropdown";
import { Label } from "../../../../../../compLibrary/input/text";
import { Modal } from "../../../../../../compLibrary/modal/Modal";
import { InfoModalContent } from "../../../../../../compLibrary/modal/variants/info/InfoModalContent";
import { TextResources } from "../../../../../../assets/text/TextResources";
import { useState } from "react";
import { OnCommitProjectClick, OnReturnClick } from "./handlers";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/store";
import { ModuleDescription, CollaborationPartner } from "@mimirorg/modelbuilder-types";

export const CommitProjectMenu = () => {
  const dispatch = useAppDispatch();
  const parsers = useAppSelector(selectors.commonStateParsersSelector);
  const projectId = useAppSelector(selectors.projectIdSelector);
  const collaborationPartners = useAppSelector(selectors.commonStateCollaborationPartnersSelector);
  const [parser, setParser] = useState(parsers[0]);
  const [collaborationPartner, setCollaborationPartner] = useState(collaborationPartners[0]);
  const isActionDisabled = !(collaborationPartner && parser && projectId);
  const onAction = () => OnCommitProjectClick(dispatch, projectId, parser.id, collaborationPartner.domain);
  const onExit = () => OnReturnClick(dispatch);

  return (
    <Modal isBlurred isOpen onExit={onExit}>
      <InfoModalContent title={TextResources.COMMIT_PROJECT}>
        <Label>{TextResources.PARTNER}</Label>
        <Dropdown
          label="Collaboration partner"
          valueProp="name"
          items={collaborationPartners}
          keyProp="id"
          onChange={(item: CollaborationPartner) => setCollaborationPartner(item)}
        />
        <Label>{TextResources.COMMIT_PARSER}</Label>
        <Dropdown
          label="Collaboration partner"
          valueProp="name"
          items={parsers}
          keyProp="id"
          onChange={(item: ModuleDescription) => setParser(item)}
        />
        <ButtonBox>
          <Button onClick={onExit} text={TextResources.CANCEL} />
          <Button disabled={isActionDisabled} onClick={onAction} text={TextResources.COMMIT} icon={CommitProjectIcon} />
        </ButtonBox>
      </InfoModalContent>
    </Modal>
  );
};
