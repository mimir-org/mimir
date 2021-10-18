import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { MENU_TYPE } from "../../../../models/project";
import { CloseIcon } from "../../../../assets/icons/close";
import { TextResources } from "../../../../assets/text";
import { useState } from "react";
import { Input, Label, Size } from "../../../../compLibrary";
import { Button } from "../../../../compLibrary/buttons";
import { OnReturnClick, OnSaveClick } from "./handlers";
import { ProjectBody, ProjectBox, HeaderBox, ButtonBox } from "../../../../compLibrary/box/project";

export const ExportLibraryFileMenu = () => {
  const dispatch = useDispatch();
  const [fileName, setFileName] = useState("");
  const isOpen = useSelector<RootState>((s) => s.menu.activeMenu === MENU_TYPE.SAVE_LIBRARY_FILE_MENU) as boolean;

  return (
    <ProjectBox width={Size.MenuSmall_Width} height={Size.MenuSmall_Height} visible={isOpen}>
      <ProjectBody>
        <HeaderBox>
          <img src={CloseIcon} alt="Close project" onClick={() => OnReturnClick(dispatch)} className="icon" />
          {TextResources.Account_Export_Library_File}
        </HeaderBox>
        <Label>{TextResources.Account_Save_Label_File_Name}</Label>
        <Input
          onChange={(e: any) => setFileName(e.target.value)}
          inputType="text"
          placeholder={TextResources.Account_Save_Label_File_Name}
          value={fileName}
        />
        <ButtonBox left>
          <Button onClick={() => OnReturnClick(dispatch)} type={TextResources.Account_Cancel} />
        </ButtonBox>
        {fileName && (
          <ButtonBox>
            <Button
              onClick={() => OnSaveClick(dispatch, fileName)}
              type={TextResources.Account_Export_File_Library_Label}
            />
          </ButtonBox>
        )}
      </ProjectBody>
    </ProjectBox>
  );
};

export default ExportLibraryFileMenu;