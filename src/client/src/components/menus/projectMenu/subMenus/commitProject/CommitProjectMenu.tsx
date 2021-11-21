import * as Handlers from "./handlers";
import { useState } from "react";
import { isActiveMenuSelector, useAppDispatch, useParametricAppSelector } from "../../../../../redux/store";
import { MENU_TYPE } from "../../../../../models/project";
import { CloseIcon } from "../../../../../assets/icons/close";
import { TextResources } from "../../../../../assets/text";
import { Label } from "../../../../../compLibrary/input/text";
import { Button } from "../../../../../compLibrary/buttons";
import { ProjectBody, ProjectBox, HeaderBox, ButtonBox } from "../styled";
import { Dropdown } from "../../../../../compLibrary/dropdown/mimir";
import { Contractor, ModuleDescription } from "../../../../../models";
import { Size } from "../../../../../compLibrary/size";

interface Props {
  contractors: Contractor[];
  parsers: ModuleDescription[];
  projectId: string;
  disabled: boolean;
}

export const CommitProjectMenu = ({ contractors, parsers, projectId, disabled }: Props) => {
  const dispatch = useAppDispatch();
  const [contractor, setContractor] = useState(contractors[0]);
  const [parser, setParser] = useState(parsers[0]);
  const isOpen = useParametricAppSelector(isActiveMenuSelector, MENU_TYPE.COMMIT_PROJECT);

  return (
    <ProjectBox width={Size.MenuSmall_Width} height={Size.MenuSmall_Height} visible={isOpen}>
      <ProjectBody removeHeight={true}>
        <HeaderBox marginBottom={10}>
          <img src={CloseIcon} alt="Close project" onClick={() => Handlers.OnReturnClick(dispatch)} className="icon" />
          {TextResources.Project_Commit_Label}
        </HeaderBox>

        <Label>{TextResources.Project_Commit_Contractor_Label}</Label>
        <Dropdown label="Contractor" valueProp="name" items={contractors} keyProp="id" onChange={(e: any) => setContractor(e)} />

        <Label>{TextResources.Project_Commit_Parser_Label}</Label>
        <Dropdown label="Contractor" valueProp="name" items={parsers} keyProp="id" onChange={(e: any) => setParser(e)} />

        <ButtonBox left>
          <Button onClick={() => Handlers.OnReturnClick(dispatch)} type={TextResources.Project_Cancel} />
        </ButtonBox>
        {contractor && parser && projectId && (
          <ButtonBox>
            <Button
              onClick={() => Handlers.OnCommitProjectClick(dispatch, projectId, parser.id, contractor.domain)}
              type={TextResources.Project_Commit_Button}
            />
          </ButtonBox>
        )}
      </ProjectBody>
    </ProjectBox>
  );
};

export default CommitProjectMenu;
