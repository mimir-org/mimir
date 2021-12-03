import { useState } from "react";
import { isActiveMenuSelector, useAppDispatch, useParametricAppSelector } from "../../../../../redux/store";
import { MENU_TYPE } from "../../../../../models/project";
import { CloseIcon } from "../../../../../assets/icons/close";
import { TextResources } from "../../../../../assets/text";
import { Button } from "../../../../../compLibrary/buttons";
import { OnReturnClick, OnSaveClick } from "./handlers";
import { ProjectBody, ProjectBox, HeaderBox, ButtonBox, InputBox } from "../styled";
import { Input } from "../../../../../compLibrary/input/text";
import { ExportLibraryIcon } from "../../../../../assets/icons/project";

export const ExportLibraryFileMenu = () => {
  const dispatch = useAppDispatch();
  const [fileName, setFileName] = useState("");
  const isOpen = useParametricAppSelector(isActiveMenuSelector, MENU_TYPE.SAVE_LIBRARY_FILE_MENU);

  return (
    <ProjectBox visible={isOpen}>
      <ProjectBody>
        <HeaderBox>
          <img src={CloseIcon} alt="Close project" onClick={() => OnReturnClick(dispatch)} className="icon" />
          {TextResources.Project_Export_LibraryTypes}
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
              onClick={() => OnSaveClick(dispatch, fileName)}
              text={TextResources.Project_Export_Library}
              icon={ExportLibraryIcon}
            />
          </ButtonBox>
        )}
      </ProjectBody>
    </ProjectBox>
  );
};

export default ExportLibraryFileMenu;
