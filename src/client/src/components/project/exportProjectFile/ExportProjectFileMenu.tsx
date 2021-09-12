import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { ProjectState } from "../../../redux/store/project/types";
import { MENU_TYPE } from "../../../models/project";
import { CloseIcon } from "../../../assets/icons/common";
import { TextResources } from "../../../assets/text";
import { useState } from "react";
import { Input, Label, Size } from "../../../compLibrary";
import { Button } from "../../../compLibrary/buttons";
import { OnReturnClick, OnSaveClick } from "./handlers";
import {
  ProjectBody,
  ProjectBox,
  HeaderBox,
  ButtonBox,
} from "../../../compLibrary/box/project";

interface Props {
  projectState: ProjectState;
  dispatch: any;
}

export const ExportProjectFileMenu = ({ projectState, dispatch }: Props) => {
  const [fileName, setFileName] = useState("");

  const isOpen = useSelector<RootState>(
    (state) =>
      state.menu.list.find((x) => x.type === MENU_TYPE.SAVE_PROJECT_FILE_MENU)
        ?.visible
  ) as boolean;

  return (
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
            onClick={() => OnReturnClick(dispatch)}
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
          <Button
            onClick={() => OnReturnClick(dispatch)}
            type={TextResources.Account_Cancel}
          />
        </ButtonBox>
        {fileName && (
          <ButtonBox>
            <Button
              onClick={() => OnSaveClick(dispatch, projectState, fileName)}
              type={TextResources.Account_Export_File_Label}
            />
          </ButtonBox>
        )}
      </ProjectBody>
    </ProjectBox>
  );
};

export default ExportProjectFileMenu;
