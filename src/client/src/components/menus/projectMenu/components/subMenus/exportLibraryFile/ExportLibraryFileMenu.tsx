import { Button } from "../../../../../../compLibrary/buttons/standard";
import { ButtonBox } from "../shared/styled/ButtonBox";
import { ExportLibraryIcon } from "../../../../../../assets/icons/project";
import { Modal } from "../../../../../../compLibrary/modal/Modal";
import { InfoModalContent } from "../../../../../../compLibrary/modal/variants/info/InfoModalContent";
import { TextResources } from "../../../../../../assets/text/TextResources";
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
      <InfoModalContent title={TextResources.PROJECT_EXPORT_LIBRARY_TYPES}>
        <Label>{TextResources.FILE_NAME}</Label>
        <Input
          onChange={(e: ChangeEvent<HTMLInputElement>) => setFileName(e.target.value)}
          inputType="text"
          placeholder={TextResources.FILE_NAME}
          value={fileName}
        />
        <ButtonBox>
          <Button onClick={onExit} text={TextResources.CANCEL} />
          <Button
            disabled={isActionDisabled}
            onClick={onAction}
            text={TextResources.PROJECT_EXPORT_LIBRARY}
            icon={ExportLibraryIcon}
          />
        </ButtonBox>
      </InfoModalContent>
    </Modal>
  );
};
