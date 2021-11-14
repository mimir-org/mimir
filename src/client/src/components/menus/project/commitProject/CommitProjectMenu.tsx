import * as Handlers from "./handlers";
import { isActiveMenuSelector, useAppDispatch, useParametricAppSelector } from "../../../../redux/store";
import { MENU_TYPE } from "../../../../models/project";
import { CloseIcon } from "../../../../assets/icons/close";
import { TextResources } from "../../../../assets/text";
import { useState } from "react";
import { Label, Size } from "../../../../compLibrary";
import { Button } from "../../../../compLibrary/buttons";
import { ProjectBody, ProjectBox, HeaderBox, ButtonBox } from "../styled";
import { Dropdown } from "../../../../compLibrary/dropdown/mimir";
import { Contractor, ModuleDescription } from "../../../../models";

interface Props {
  contractors: Contractor[];
  parsers: ModuleDescription[];
  projectId: string;
}

export const CommitProjectMenu = ({ contractors, parsers, projectId }: Props) => {
  const dispatch = useAppDispatch();
  const [contractor, setContractor] = useState(contractors[0]);
  const [parser, setParser] = useState(parsers[0]);
  const isOpen = useParametricAppSelector(isActiveMenuSelector, MENU_TYPE.COMMIT_PROJECT);

  return (
    <ProjectBox width={Size.MenuSmall_Width} height={Size.MenuSmall_Height} visible={isOpen}>
      <ProjectBody removeHeight={true}>
        <HeaderBox marginBottom={10}>
          <img src={CloseIcon} alt="Close project" onClick={() => Handlers.OnReturnClick(dispatch)} className="icon" />
          {TextResources.Account_Commit_Label}
        </HeaderBox>

        <Label>{TextResources.Account_Commit_Contractor_Label}</Label>
        <Dropdown label="Contractor" valueProp="name" items={contractors} keyProp="id" onChange={(e: any) => setContractor(e)} />

        <Label>{TextResources.Account_Commit_Parser_Label}</Label>
        <Dropdown label="Contractor" valueProp="name" items={parsers} keyProp="id" onChange={(e: any) => setParser(e)} />

        <ButtonBox left>
          <Button onClick={() => Handlers.OnReturnClick(dispatch)} type={TextResources.Account_Cancel} />
        </ButtonBox>
        {contractor && parser && projectId && (
          <ButtonBox>
            <Button
              onClick={() => Handlers.OnCommitProjectClick(dispatch, projectId, parser.id, contractor.domain)}
              type={TextResources.Account_Commit_Button}
            />
          </ButtonBox>
        )}
      </ProjectBody>
    </ProjectBox>
  );
};

export default CommitProjectMenu;
