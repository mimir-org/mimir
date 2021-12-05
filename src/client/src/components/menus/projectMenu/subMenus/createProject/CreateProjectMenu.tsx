import * as Handlers from "./handlers";
import { useState } from "react";
import { isActiveMenuSelector, useParametricAppSelector } from "../../../../../redux/store";
import { MENU_TYPE } from "../../../../../models/project";
import { CloseIcon } from "../../../../../assets/icons/close";
import { TextResources } from "../../../../../assets/text";
import { Input } from "../../../../../compLibrary/input/text";
import { Button } from "../../../../../compLibrary/buttons";
import { ProjectBody, ProjectBox, HeaderBox, ButtonBox, InputBox } from "../styled";
import { CreateProjectIcon } from "../../../../../assets/icons/project";

interface Props {
  dispatch: any;
}

export const CreateProjectMenu = ({ dispatch }: Props) => {
  const [projectName, setProjectName] = useState("");
  const isOpen = useParametricAppSelector(isActiveMenuSelector, MENU_TYPE.CREATE_PROJECT_MENU);

  return (
    <ProjectBox visible={isOpen}>
      <ProjectBody>
        <HeaderBox>
          <img src={CloseIcon} alt="Close project" onClick={() => Handlers.OnReturnClick(dispatch)} className="icon" />
          {TextResources.Project_CreateProject}
        </HeaderBox>
        <InputBox>
          <div className="label">{TextResources.Project_Name}</div>
          <Input
            onChange={(e: any) => setProjectName(e.target.value)}
            inputType="text"
            placeholder={TextResources.Project_Name_Placeholder}
            value={projectName}
          />
        </InputBox>
        <ButtonBox left>
          <Button onClick={() => Handlers.OnReturnClick(dispatch)} text={TextResources.Project_Cancel} />
        </ButtonBox>
        {projectName && (
          <ButtonBox>
            <Button
              onClick={() => Handlers.OnProjectCreateClick(dispatch, projectName)}
              text={TextResources.Project_Create}
              icon={CreateProjectIcon}
            />
          </ButtonBox>
        )}
      </ProjectBody>
    </ProjectBox>
  );
};

export default CreateProjectMenu;
