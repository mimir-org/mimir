import * as Handlers from "./handlers";
import { useState } from "react";
import { isActiveMenuSelector, useParametricAppSelector } from "../../../../../redux/store";
import { MENU_TYPE } from "../../../../../models/project";
import { CloseIcon } from "../../../../../assets/icons/close";
import { TextResources } from "../../../../../assets/text";
import { Label } from "../../../../../compLibrary/input/text";
import { Button } from "../../../../../compLibrary/buttons";
import { ProjectBody, ProjectBox, HeaderBox, ButtonBox } from "../styled";
import { Dropdown } from "../../../../../compLibrary/dropdown/mimir";
import { CollaborationPartner, ModuleDescription } from "../../../../../models";
import { CommitProjectIcon } from "../../../../../assets/icons/project";

interface Props {
  collaborationPartners: CollaborationPartner[];
  parsers: ModuleDescription[];
  projectId: string;
  disabled: boolean;
  dispatch: any;
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
            onChange={(e: any) => setCollaborationPartner(e)}
          />
          <Label>{TextResources.Project_Commit_Parser}</Label>
          <Dropdown
            label="Collaboration partner"
            valueProp="name"
            items={parsers}
            keyProp="id"
            onChange={(e: any) => setParser(e)}
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
