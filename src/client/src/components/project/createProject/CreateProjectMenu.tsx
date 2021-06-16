import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { PROJECT_MENU_TYPE } from "../../../models/project";
import { CloseIcon, RightArrowIcon } from "../../../assets/icons/common";
import { TextResources } from "../../../assets/textResources";
import { changeProjectMenu } from "../../../redux/store/projectMenu/actions";
import { useState } from "react";
import { Input, Label } from "../../../compLibrary";
import { MenuButton } from "../../../compLibrary/buttons";
import { create } from "../../../redux/store/project/actions";
import {
  ProjectBody,
  ProjectBox,
  HeaderBox,
  ButtonBox,
} from "../../../compLibrary/box/project";

export const CreateProjectMenu = () => {
  const dispatch = useDispatch();
  const [projectName, setProjectName] = useState("");

  const isOpen = useSelector<RootState>(
    (state) =>
      state.projectMenu.menu.find(
        (x) => x.type === PROJECT_MENU_TYPE.CREATE_PROJECT_MENU
      ).visible
  ) as boolean;

  const handleReturnClick = () => {
    dispatch(changeProjectMenu(PROJECT_MENU_TYPE.CREATE_PROJECT_MENU, false));
  };

  const handleProjectCreateClick = () => {
    dispatch(create(projectName, projectName));
    dispatch(changeProjectMenu(PROJECT_MENU_TYPE.CREATE_PROJECT_MENU, false));
  };

  return (
    <>
      <ProjectBox width={320} height={220} visible={isOpen}>
        <ProjectBody>
          <HeaderBox>
            <img
              src={CloseIcon}
              alt="Close project"
              onClick={handleReturnClick}
              className="icon"
            />
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
            <MenuButton onClick={() => handleReturnClick()}>
              <p>{TextResources.Account_Cancel_Button}</p>
            </MenuButton>
          </ButtonBox>
          {projectName && (
            <ButtonBox>
              <MenuButton onClick={() => handleProjectCreateClick()} wide>
                <p>{TextResources.Account_Create_Button_Label}</p>
                <img src={RightArrowIcon} alt="Open project" className="icon" />
              </MenuButton>
            </ButtonBox>
          )}
        </ProjectBody>
      </ProjectBox>
    </>
  );
};

export default CreateProjectMenu;
