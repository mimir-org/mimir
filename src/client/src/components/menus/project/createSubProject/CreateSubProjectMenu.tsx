import * as Handlers from "./handlers";
import { isActiveMenuSelector, useAppDispatch, useParametricAppSelector } from "../../../../redux/store";
import { MENU_TYPE } from "../../../../models/project";
import { CloseIcon } from "../../../../assets/icons/close";
import { TextResources } from "../../../../assets/text";
import { useState } from "react";
import { Input, Label, Size } from "../../../../compLibrary";
import { Button } from "../../../../compLibrary/buttons";
import { ProjectBody, ProjectBox, HeaderBox, ButtonBox } from "../styled";

interface Props {
  nodeIds: string[];
  edgeIds: string[];
}

export const CreateSubProjectMenu = ({ nodeIds, edgeIds }: Props) => {
  const dispatch = useAppDispatch();
  const [projectName, setProjectName] = useState("");
  const isOpen = useParametricAppSelector(isActiveMenuSelector, MENU_TYPE.CREATE_SUB_PROJECT_MENU);

  return (
    <>
      <ProjectBox width={Size.MenuSmall_Width} height={Size.MenuSmall_Height} visible={isOpen}>
        <ProjectBody>
          <HeaderBox>
            <img src={CloseIcon} alt="Close project" onClick={() => Handlers.OnReturnClick(dispatch)} className="icon" />
            {TextResources.Account_SubProject_Create_Label}
          </HeaderBox>
          <Label>{TextResources.Account_Name_Project_Label}</Label>
          <Input
            onChange={(e: any) => setProjectName(e.target.value)}
            inputType="text"
            placeholder={TextResources.Account_Name_Project_Placeholder}
            value={projectName}
          />
          <ButtonBox left>
            <Button onClick={() => Handlers.OnReturnClick(dispatch)} type={TextResources.Account_Cancel} />
          </ButtonBox>
          {projectName && (
            <ButtonBox>
              <Button
                onClick={() => Handlers.OnSubProjectCreateClick(projectName, nodeIds, edgeIds, dispatch)}
                type={TextResources.Account_SubProject_Create}
              />
            </ButtonBox>
          )}
        </ProjectBody>
      </ProjectBox>
    </>
  );
};

export default CreateSubProjectMenu;
