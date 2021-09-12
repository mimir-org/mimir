import * as Handlers from "./handlers";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { MENU_TYPE } from "../../../models/project";
import { CloseIcon, RightArrowIcon } from "../../../assets/icons/common";
import { TextResources } from "../../../assets/text";
import { useState } from "react";
import { Input, Label, Size } from "../../../compLibrary";
import { MenuButton } from "../../../compLibrary/buttons";
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
      state.menu.list.find((x) => x.type === MENU_TYPE.CREATE_PROJECT_MENU)
        ?.visible
  ) as boolean;

  return (
    <>
      <ProjectBox
        width={Size.MenuSmall_Width}
        height={Size.MenuSmall_Height}
        visible={isOpen}
      >
        <ProjectBody>
          <HeaderBox>
            <img
              src={CloseIcon}
              alt="Close project"
              onClick={() => Handlers.OnReturnClick(dispatch)}
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
            <MenuButton onClick={() => Handlers.OnReturnClick(dispatch)}>
              <p>{TextResources.Account_Cancel_Button}</p>
            </MenuButton>
          </ButtonBox>
          {projectName && (
            <ButtonBox>
              <MenuButton
                onClick={() =>
                  Handlers.OnProjectCreateClick(dispatch, projectName)
                }
                wide
              >
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
