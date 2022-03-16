import { Button } from "../../../../../../compLibrary/buttons";
import { ButtonBox } from "../shared/styled/ButtonBox";
import { ExportLibraryIcon } from "../../../../../../assets/icons/project";
import { Modal } from "../../../../../../compLibrary/modal/Modal";
import { InfoModalContent } from "../../../../../../compLibrary/modal/variants/info/InfoModalContent";
import { TextResources } from "../../../../../../assets/text";
import { ChangeEvent, useState } from "react";
import { Input, Label } from "../../../../../../compLibrary/input/text";
import { OnReturnClick, OnExportLibraryClick } from "./handlers";
import { useAppDispatch } from "../../../../../../redux/store";

export const ExportLibraryFileMenu = () => {
  const dispatch = useAppDispatch();
  const [fileName, setFileName] = useState("");
  const onExit = () => OnReturnClick(dispatch);
  const onAction = () => OnExportLibraryClick(dispatch, fileName);
  const isActionDisabled = !fileName;

  return (
    <Modal isBlurred isOpen onExit={onExit}>
      <InfoModalContent title={TextResources.Project_Export_LibraryTypes}>
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
      </InfoModalContent>
    </Modal>
  );
};
