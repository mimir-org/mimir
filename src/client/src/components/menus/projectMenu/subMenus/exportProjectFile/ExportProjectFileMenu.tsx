import { isActiveMenuSelector, useParametricAppSelector } from "../../../../../redux/store";
import { ProjectState } from "../../../../../redux/store/project/types";
import { MENU_TYPE } from "../../../../../models/project";
import { CloseIcon } from "../../../../../assets/icons/close";
import { TextResources } from "../../../../../assets/text";
import { useState } from "react";
import { Input } from "../../../../../compLibrary/input/text";
import { Button } from "../../../../../compLibrary/buttons";
import { OnReturnClick, OnSaveClick } from "./handlers";
import { ProjectBody, ProjectBox, HeaderBox, ButtonBox, InputBox } from "../styled";
import { ExportProjectIcon } from "../../../../../assets/icons/project";

interface Props {
  projectState: ProjectState;
  dispatch: any;
}

export const ExportProjectFileMenu = ({ projectState, dispatch }: Props) => {
  const [fileName, setFileName] = useState("");
  const isOpen = useParametricAppSelector(isActiveMenuSelector, MENU_TYPE.SAVE_PROJECT_FILE_MENU);

  return (
    <ProjectBox visible={isOpen}>
      <ProjectBody>
        <HeaderBox>
          <img src={CloseIcon} alt="Close project" onClick={() => OnReturnClick(dispatch)} className="icon" />
          {TextResources.Project_Export}
        </HeaderBox>
        <InputBox>
          <div className="label">{TextResources.Project_File_Name}</div>
          <Input
            onChange={(e: any) => setFileName(e.target.value)}
            inputType="text"
            placeholder={TextResources.Project_File_Name}
            value={fileName}
          />
        </InputBox>
        <ButtonBox left>
          <Button onClick={() => OnReturnClick(dispatch)} text={TextResources.Project_Cancel} />
        </ButtonBox>
        {fileName && (
          <ButtonBox>
            <Button
              onClick={() => OnSaveClick(dispatch, projectState, fileName)}
              text={TextResources.Project_Export_File}
              icon={ExportProjectIcon}
            />
          </ButtonBox>
        )}
      </ProjectBody>
    </ProjectBox>
  );
};

export default ExportProjectFileMenu;
