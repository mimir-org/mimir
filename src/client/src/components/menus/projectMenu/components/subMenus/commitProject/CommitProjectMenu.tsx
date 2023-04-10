import { Button } from "../../../../../../compLibrary/buttons/standard";
import { ButtonBox } from "../../../../../../compLibrary/buttons/ButtonBox";
import { CommitProjectIcon } from "../../../../../../assets/icons/project";
import { Dropdown } from "compLibrary/dropdown/Dropdown";
import { Label } from "../../../../../../compLibrary/input/text";
import { Modal } from "../../../../../../compLibrary/modal/Modal";
import { InfoModalContent } from "../../../../../../compLibrary/modal/variants/info/InfoModalContent";
import { TextResources } from "../../../../../../assets/text/TextResources";
import { useState } from "react";
import { OnCommitProjectClick, OnReturnClick } from "./handlers";
import { commonStateSelector, useAppDispatch, useAppSelector } from "store";
import { MimirorgCompanyCm } from "@mimirorg/typelibrary-types";
import { ModuleDescription } from "lib";
import { CommonState } from "store/reducers/commonReducer";

export const CommitProjectMenu = () => {
  const dispatch = useAppDispatch();
  const commonState = useAppSelector<CommonState>(commonStateSelector);
  const [parser, setParser] = useState(commonState?.parsers[0]);
  const [collaborationPartner, setCollaborationPartner] = useState(commonState?.companies[0]);
  const isActionDisabled = !(collaborationPartner && parser && null); // TODO: projectId
  const onAction = () => OnCommitProjectClick(dispatch, null, parser.id, collaborationPartner.domain);
  const onExit = () => OnReturnClick(dispatch);

  return (
    <Modal isBlurred isOpen onExit={onExit}>
      <InfoModalContent title={TextResources.COMMIT_PROJECT}>
        <Label>{TextResources.PARTNER}</Label>
        <Dropdown
          label="Collaboration partner"
          valueProp="name"
          items={commonState?.companies ?? []}
          keyProp="id"
          onChange={(item: MimirorgCompanyCm) => setCollaborationPartner(item)}
        />
        <Label>{TextResources.COMMIT_PARSER}</Label>
        <Dropdown
          label="Collaboration partner"
          valueProp="name"
          items={commonState?.parsers ?? []}
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
