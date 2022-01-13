import * as Handlers from "./handlers";
import { useState } from "react";
import { isActiveMenuSelector, useParametricAppSelector } from "../../../../../redux/store";
import { MENU_TYPE } from "../../../../../models/project";
import { CloseIcon } from "../../../../../assets/icons/close";
import { TextResources } from "../../../../../assets/text";
import { Label } from "../../../../../compLibrary/input/text";
import { Button } from "../../../../../compLibrary/buttons";
import { ButtonBox, HeaderBox, ProjectBody, ProjectBox } from "../styled";
import { Dropdown } from "../../../../../compLibrary/dropdown/mimir";
import { CollaborationPartner, ModuleDescription } from "../../../../../models";
import { CommitProjectIcon } from "../../../../../assets/icons/project";
import { Dispatch } from "redux";

interface Props {
  collaborationPartners: CollaborationPartner[];
  parsers: ModuleDescription[];
  projectId: string;
  disabled: boolean;
  dispatch: Dispatch;
}

export const CommitProjectMenu = ({ collaborationPartners, parsers, projectId, disabled, dispatch }: Props) => {
  const [collaborationPartner, setCollaborationPartner] = useState(collaborationPartners[0]);
  const [parser, setParser] = useState(parsers[0]);
  const isOpen = useParametricAppSelector(isActiveMenuSelector, MENU_TYPE.COMMIT_PROJECT);

  return (
    !disabled && (
      <ProjectBox visible={isOpen}>
        <ProjectBody>
          <HeaderBox>
            <img src={CloseIcon} alt="Close project" onClick={() => Handlers.OnReturnClick(dispatch)} className="icon" />
            {TextResources.Project_Commit_Project}
          </HeaderBox>

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

          <ButtonBox left>
            <Button onClick={() => Handlers.OnReturnClick(dispatch)} text={TextResources.Project_Cancel} />
          </ButtonBox>
          {collaborationPartner && parser && projectId && (
            <ButtonBox>
              <Button
                onClick={() => Handlers.OnCommitProjectClick(dispatch, projectId, parser.id, collaborationPartner.domain)}
                text={TextResources.Project_Commit}
                icon={CommitProjectIcon}
              />
            </ButtonBox>
          )}
        </ProjectBody>
      </ProjectBox>
    )
  );
};

export default CommitProjectMenu;
