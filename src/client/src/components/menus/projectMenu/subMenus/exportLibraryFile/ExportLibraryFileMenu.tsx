import { Button } from "../../../../../compLibrary/buttons";
import { ButtonBox } from "../styled";
import { ExportLibraryIcon } from "../../../../../assets/icons/project";
import { MENU_TYPE } from "../../../../../models/project";
import { Modal } from "../../../modal/Modal";
import { TextResources } from "../../../../../assets/text";
import { ChangeEvent, useState } from "react";
import { Input, Label } from "../../../../../compLibrary/input/text";
import { OnReturnClick, OnSaveClick } from "./handlers";
import { isActiveMenuSelector, useAppDispatch, useParametricAppSelector } from "../../../../../redux/store";

export const ExportLibraryFileMenu = () => {
  const dispatch = useAppDispatch();
  const [fileName, setFileName] = useState("");
  const isOpen = useParametricAppSelector(isActiveMenuSelector, MENU_TYPE.SAVE_LIBRARY_FILE_MENU);
  const onExit = () => OnReturnClick(dispatch);
  const onAction = () => OnSaveClick(dispatch, fileName);
  const isActionDisabled = !fileName;

  return (
    <Modal title={TextResources.Project_Export_LibraryTypes} isOpen={isOpen} onExit={onExit}>
      <Label>{TextResources.Project_File_Name}</Label>
      <Input
        onChange={(e: ChangeEvent<HTMLInputElement>) => setFileName(e.target.value)}
        inputType="text"
        placeholder={TextResources.Project_File_Name}
        value={fileName}
      />
      <ButtonBox>
        <Button onClick={onExit} text={TextResources.Project_Cancel} />
        <Button
          disabled={isActionDisabled}
          onClick={onAction}
          text={TextResources.Project_Export_Library}
          icon={ExportLibraryIcon}
        />
      </ButtonBox>
    </Modal>
  );
};

export default ExportLibraryFileMenu;
