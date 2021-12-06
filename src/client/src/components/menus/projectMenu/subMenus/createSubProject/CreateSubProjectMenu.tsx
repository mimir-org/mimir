import * as Handlers from "./handlers";
import { useState } from "react";
import { isActiveMenuSelector, useParametricAppSelector } from "../../../../../redux/store";
import { MENU_TYPE } from "../../../../../models/project";
import { CloseIcon } from "../../../../../assets/icons/close";
import { TextResources } from "../../../../../assets/text";
import { Input, Label } from "../../../../../compLibrary/input/text";
import { Button } from "../../../../../compLibrary/buttons";
import { ProjectBody, ProjectBox, HeaderBox, ButtonBox } from "../styled";
import { CreateSubProjectIcon } from "../../../../../assets/icons/project";

interface Props {
  fromProjectId: string;
  nodeIds: string[];
  edgeIds: string[];
  disabled: boolean;
  dispatch: any;
}

export const CreateSubProjectMenu = ({ nodeIds, edgeIds, fromProjectId, disabled, dispatch }: Props) => {
  const [projectName, setProjectName] = useState("");
  const isOpen = useParametricAppSelector(isActiveMenuSelector, MENU_TYPE.CREATE_SUB_PROJECT_MENU);

  return (
    !disabled && (
      <ProjectBox visible={isOpen}>
        <ProjectBody>
          <HeaderBox>
            <img src={CloseIcon} alt="Close project" onClick={() => Handlers.OnReturnClick(dispatch)} className="icon" />
            {TextResources.Project_SubProject_Save}
          </HeaderBox>
          <Label>{TextResources.Project_Name}</Label>
          <Input
            onChange={(e: any) => setProjectName(e.target.value)}
            inputType="text"
            placeholder={TextResources.Project_Name_Placeholder}
            value={projectName}
          />
          <ButtonBox left>
            <Button onClick={() => Handlers.OnReturnClick(dispatch)} text={TextResources.Project_Cancel} />
          </ButtonBox>
          {projectName && (
            <ButtonBox>
              <Button
                onClick={() => Handlers.OnSubProjectCreateClick(fromProjectId, projectName, nodeIds, edgeIds, dispatch)}
                text={TextResources.Project_SubProject}
                icon={CreateSubProjectIcon}
              />
            </ButtonBox>
          )}
        </ProjectBody>
      </ProjectBox>
    )
  );
};

export default CreateSubProjectMenu;
