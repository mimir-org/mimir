import * as Handlers from "./handlers";
import { useState } from "react";
import { isActiveMenuSelector, useAppDispatch, useParametricAppSelector } from "../../../../../redux/store";
import { MENU_TYPE } from "../../../../../models/project";
import { CloseIcon } from "../../../../../assets/icons/close";
import { TextResources } from "../../../../../assets/text";
import { Size } from "../../../../../compLibrary/size";
import { Input, Label } from "../../../../../compLibrary/input/text";
import { Button } from "../../../../../compLibrary/buttons";
import { ProjectBody, ProjectBox, HeaderBox, ButtonBox } from "../styled";
import { CreateProjectIcon } from "../../../../../assets/icons/project";

export const CreateProjectMenu = () => {
  const dispatch = useAppDispatch();
  const [projectName, setProjectName] = useState("");
  const isOpen = useParametricAppSelector(isActiveMenuSelector, MENU_TYPE.CREATE_PROJECT_MENU);

  return (
    <ProjectBox width={Size.MenuSmall_Width} height={Size.MenuSmall_Height} visible={isOpen}>
      <ProjectBody>
        <HeaderBox>
          <img src={CloseIcon} alt="Close project" onClick={() => Handlers.OnReturnClick(dispatch)} className="icon" />
          {TextResources.Project_Create_Label}
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
