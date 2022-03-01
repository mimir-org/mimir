import { Button } from "../../../../../../compLibrary/buttons";
import { ButtonBox } from "../shared/styled/ButtonBox";
import { ImportLibraryIcon } from "../../../../../../assets/icons/project";
import { Label } from "../../../../../../compLibrary/input/text";
import { MENU_TYPE } from "../../../../../../models/project";
import { Modal } from "../../../../../../compLibrary/modal/Modal";
import { InfoModalContent } from "../../../../../../compLibrary/modal/variants/info/InfoModalContent";
import { TextResources } from "../../../../../../assets/text";
import { useFilePicker } from "use-file-picker";
import { CreateLibraryType, FileData } from "../../../../../../models";
import { OnReturnClick, OnSaveClick } from "./handlers";
import { isActiveMenuSelector, useAppDispatch, useParametricAppSelector } from "../../../../../../redux/store";

export const ImportFileLibraryMenu = () => {
  const dispatch = useAppDispatch();
  const isOpen = useParametricAppSelector(isActiveMenuSelector, MENU_TYPE.IMPORT_LIBRARY_FILE_MENU);
  const onExit = () => OnReturnClick(dispatch);

  const [openFileSelector, { filesContent, plainFiles }] = useFilePicker({
    multiple: false,
    readAs: "Text",
    accept: [".json"],
    limitFilesConfig: { min: 1, max: 1 },
  });

  const data = () => {
    if (!filesContent || filesContent.length <= 0) return null;

    const fileData = filesContent[0] as FileData;
    return JSON.parse(fileData.content) as CreateLibraryType[];
  };

  const selectedText = plainFiles?.[0]?.name ?? TextResources.Project_Import_Select;
  const onAction = () => OnSaveClick(dispatch, data);
  const isActionDisabled = filesContent?.length <= 0 || plainFiles?.length <= 0;

  return (
    <Modal isBlurred isOpen={isOpen} onExit={onExit}>
      <InfoModalContent title={TextResources.Project_Import_LibraryTypes}>
        <Label>
          {TextResources.Project_Import_File}: {selectedText}
        </Label>
        <Button onClick={() => openFileSelector()} text={TextResources.Project_Browse} />
        <ButtonBox>
          <Button onClick={onExit} text={TextResources.Project_Cancel} />
          <Button
            disabled={isActionDisabled}
            onClick={onAction}
            text={TextResources.Project_Import_Library}
            icon={ImportLibraryIcon}
          />
        </ButtonBox>
      </InfoModalContent>
    </Modal>
  );
};
