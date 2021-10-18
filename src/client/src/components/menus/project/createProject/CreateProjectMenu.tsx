import * as Handlers from "./handlers";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../redux/store";
import { MENU_TYPE } from "../../../../models/project";
import { CloseIcon } from "../../../../assets/icons/close";
import { TextResources } from "../../../../assets/text";
import { useState } from "react";
import { Input, Label, Size } from "../../../../compLibrary";
import { Button } from "../../../../compLibrary/buttons";
import { ProjectBody, ProjectBox, HeaderBox, ButtonBox } from "../../../../compLibrary/box/project";

export const CreateProjectMenu = () => {
  const dispatch = useDispatch();
  const [projectName, setProjectName] = useState("");
  const isOpen = useSelector<RootState>((state) => state.menu.activeMenu === MENU_TYPE.CREATE_PROJECT_MENU) as boolean;

  return (
    <>
      <ProjectBox width={Size.MenuSmall_Width} height={Size.MenuSmall_Height} visible={isOpen}>
        <ProjectBody>
          <HeaderBox>
            <img src={CloseIcon} alt="Close project" onClick={() => Handlers.OnReturnClick(dispatch)} className="icon" />
            {TextResources.Account_Create_Label}
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
                onClick={() => Handlers.OnProjectCreateClick(dispatch, projectName)}
                type={TextResources.Account_Create}
              />
            </ButtonBox>
          )}
        </ProjectBody>
      </ProjectBox>
    </>
  );
};

export default CreateProjectMenu;