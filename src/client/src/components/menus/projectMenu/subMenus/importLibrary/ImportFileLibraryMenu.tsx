import { isActiveMenuSelector, useParametricAppSelector } from "../../../../../redux/store";
import { MENU_TYPE } from "../../../../../models/project";
import { CreateLibraryType, FileData } from "../../../../../models";
import { CloseIcon } from "../../../../../assets/icons/close";
import { TextResources } from "../../../../../assets/text";
import { Button } from "../../../../../compLibrary/buttons";
import { useFilePicker } from "use-file-picker";
import { OnReturnClick, OnSaveClick } from "./handlers";
import { ButtonBox, HeaderBox, ProjectBody, ProjectBox } from "../styled";
import { ImportLibraryIcon } from "../../../../../assets/icons/project";
import { Dispatch } from "redux";

interface Props {
  dispatch: Dispatch;
}

export const ImportFileLibraryMenu = ({ dispatch }: Props) => {
  const isOpen = useParametricAppSelector(isActiveMenuSelector, MENU_TYPE.IMPORT_LIBRARY_FILE_MENU);

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

  const buttonBrowseText = () => {
    if (plainFiles?.length < 1) return TextResources.Project_Import_Library;
    return plainFiles[0].name;
  };

  return (
    <ProjectBox visible={isOpen}>
      <ProjectBody>
        <HeaderBox>
          <img src={CloseIcon} alt="Close project" onClick={() => OnReturnClick(dispatch)} className="icon" />
          {TextResources.Project_Import_LibraryTypes}
        </HeaderBox>
        <ButtonBox>
          <Button onClick={() => openFileSelector()} text={buttonBrowseText()} icon={ImportLibraryIcon} />
        </ButtonBox>
        <ButtonBox left>
          <Button onClick={() => OnReturnClick(dispatch)} text={TextResources.Project_Cancel} />
        </ButtonBox>
        {plainFiles?.length > 0 && data() && (
          <ButtonBox>
            <Button
              onClick={() => OnSaveClick(dispatch, data)}
              text={TextResources.Project_Import_Library}
              icon={ImportLibraryIcon}
            />
          </ButtonBox>
        )}
      </ProjectBody>
    </ProjectBox>
  );
};

export default ImportFileLibraryMenu;
