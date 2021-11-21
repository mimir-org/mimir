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

interface Props {
  fromProjectId: string;
  nodeIds: string[];
  edgeIds: string[];
  disabled: boolean;
}

export const CreateSubProjectMenu = ({ nodeIds, edgeIds, fromProjectId, disabled }: Props) => {
  const dispatch = useAppDispatch();
  const [projectName, setProjectName] = useState("");
  const isOpen = useParametricAppSelector(isActiveMenuSelector, MENU_TYPE.CREATE_SUB_PROJECT_MENU);

  return (
    <>
      {!disabled && (
        <ProjectBox width={Size.MenuSmall_Width} height={Size.MenuSmall_Height} visible={isOpen}>
          <ProjectBody>
            <HeaderBox>
              <img src={CloseIcon} alt="Close project" onClick={() => Handlers.OnReturnClick(dispatch)} className="icon" />
              {TextResources.Project_SubProject_Create_Label}
            </HeaderBox>
            <Label>{TextResources.Project_Name_Project_Label}</Label>
            <Input
              onChange={(e: any) => setProjectName(e.target.value)}
              inputType="text"
              placeholder={TextResources.Project_Name_Project_Placeholder}
              value={projectName}
            />
            <ButtonBox left>
              <Button onClick={() => Handlers.OnReturnClick(dispatch)} type={TextResources.Project_Cancel} />
            </ButtonBox>
            {projectName && (
              <ButtonBox>
                <Button
                  onClick={() => Handlers.OnSubProjectCreateClick(fromProjectId, projectName, nodeIds, edgeIds, dispatch)}
                  type={TextResources.Project_SubProject_Create}
                />
              </ButtonBox>
            )}
          </ProjectBody>
        </ProjectBox>
      )}
    </>
  );
};

export default CreateSubProjectMenu;
