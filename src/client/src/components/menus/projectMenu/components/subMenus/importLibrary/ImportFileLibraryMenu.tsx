import { Button } from "../../../../../../compLibrary/buttons";
import { ButtonBox } from "../shared/styled/ButtonBox";
import { ImportLibraryIcon } from "../../../../../../assets/icons/project";
import { Label } from "../../../../../../compLibrary/input/text";
import { MENU_TYPE } from "../../../../../../models/project";
import { Modal } from "../../../../../../compLibrary/modal/Modal";
import { InfoModalContent } from "../../../../../../compLibrary/modal/variants/info/InfoModalContent";
import { TextResources } from "../../../../../../assets/text/TextResources";
import { useFilePicker } from "use-file-picker";
import { OnReturnClick, OnImportLibraryClick } from "./handlers";
import { isActiveMenuSelector, useAppDispatch, useParametricAppSelector } from "../../../../../../redux/store";

export const ImportFileLibraryMenu = () => {
  const dispatch = useAppDispatch();
  const isOpen = useParametricAppSelector(isActiveMenuSelector, MENU_TYPE.IMPORT_LIBRARY_FILE_MENU);
  const onExit = () => OnReturnClick(dispatch);

  const [openFileSelector, { filesContent, plainFiles, clear }] = useFilePicker({
    multiple: false,
    readAs: "Text",
    accept: [".json"],
    limitFilesConfig: { min: 1, max: 1 },
  });

  const selectedText = plainFiles?.[0]?.name ?? TextResources.PROJECT_IMPORT_SELECT;
  const onAction = () => OnImportLibraryClick(clear, dispatch, plainFiles[0]);
  const isActionDisabled = filesContent?.length <= 0 || plainFiles?.length <= 0;

  return (
    <Modal isBlurred isOpen={isOpen} onExit={onExit}>
      <InfoModalContent title={TextResources.PROJECT_IMPORT_LIB_TYPES}>
        <Label>
          {TextResources.PROJECT_IMPORT_FILE}: {selectedText}
        </Label>
        <Button onClick={() => openFileSelector()} text={TextResources.PROJECT_BROWSE} />
        <ButtonBox>
          <Button onClick={onExit} text={TextResources.CANCEL} />
          <Button
            disabled={isActionDisabled}
            onClick={onAction}
            text={TextResources.PROJECT_IMPORT_LIB}
            icon={ImportLibraryIcon}
          />
        </ButtonBox>
      </InfoModalContent>
    </Modal>
  );
};
