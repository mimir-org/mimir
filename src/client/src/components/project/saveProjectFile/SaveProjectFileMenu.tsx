import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { ProjectState } from "../../../redux/store/project/types";
import { MENU_TYPE } from "../../../models/project";
import { CloseIcon, RightArrowIcon } from "../../../assets/icons/common";
import { TextResources } from "../../../assets/textResources";
import { changeMenu } from "../../../redux/store/projectMenu/actions";
import { useState } from "react";
import { Input, Label, Size } from "../../../compLibrary";
import { MenuButton } from "../../../compLibrary/buttons";
import {
  save,
  exportProjectToFile,
} from "../../../redux/store/project/actions";
import {
  ProjectBody,
  ProjectBox,
  HeaderBox,
  ButtonBox,
} from "../../../compLibrary/box/project";

export const SaveProjectFileMenu = () => {
  const dispatch = useDispatch();
  const [fileName, setFileName] = useState("");

  const isOpen = useSelector<RootState>(
    (state) =>
      state.menu.list.find((x) => x.type === MENU_TYPE.SAVE_PROJECT_FILE_MENU)
        .visible
  ) as boolean;

  const projectState = useSelector<RootState>(
    (state) => state.projectState
  ) as ProjectState;

  const onReturnClick = () => {
    dispatch(changeMenu(MENU_TYPE.SAVE_PROJECT_FILE_MENU, false));
  };

  const onProjectSaveClick = () => {
    if (!projectState.project) {
      throw Error("Can not export a project that does not exist");
    }

    dispatch(save(projectState.project));
    dispatch(exportProjectToFile(projectState.project, fileName, true));

    dispatch(changeMenu(MENU_TYPE.SAVE_PROJECT_FILE_MENU, false));
    dispatch(changeMenu(MENU_TYPE.ACCOUNT_MENU, false));
  };

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
              onClick={onReturnClick}
              className="icon"
            />
            {TextResources.Account_Save_Label_File}
          </HeaderBox>
          <Label>{TextResources.Account_Save_Label_File_Name}</Label>
          <Input
            onChange={(e: any) => setFileName(e.target.value)}
            inputType="text"
            placeholder={TextResources.Account_Save_Label_File_Name}
            value={fileName}
          />
          <ButtonBox left>
            <MenuButton onClick={onReturnClick}>
              <p>{TextResources.Account_Cancel_Button}</p>
            </MenuButton>
          </ButtonBox>
          {fileName && (
            <ButtonBox>
              <MenuButton onClick={onProjectSaveClick} wide>
                <p>{TextResources.Account_Save_Label_File_Button}</p>
                <img src={RightArrowIcon} alt="Open project" className="icon" />
              </MenuButton>
            </ButtonBox>
          )}
        </ProjectBody>
      </ProjectBox>
    </>
  );
};

export default SaveProjectFileMenu;
