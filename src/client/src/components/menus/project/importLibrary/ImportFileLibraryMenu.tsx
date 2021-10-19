import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { MENU_TYPE } from "../../../../models/project";
import { FileData, CreateLibraryType } from "../../../../models";
import { CloseIcon } from "../../../../assets/icons/close";
import { TextResources } from "../../../../assets/text";
import { Size } from "../../../../compLibrary";
import { Button } from "../../../../compLibrary/buttons";
import { useFilePicker } from "use-file-picker";
import { OnReturnClick, OnSaveClick } from "./handlers";
import { ProjectBody, ProjectBox, HeaderBox, ButtonBox } from "../../../../compLibrary/box/project";

export const ImportFileLibraryMenu = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((s) => s.menu.activeMenu === MENU_TYPE.IMPORT_LIBRARY_FILE_MENU);

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
    if (plainFiles?.length < 1) return TextResources.Account_Import_Library_File;
    return plainFiles[0].name;
  };

  return (
    <ProjectBox width={Size.MenuSmall_Width} height={Size.MenuSmall_Height} visible={isOpen}>
      <ProjectBody>
        <HeaderBox>
          <img src={CloseIcon} alt="Close project" onClick={() => OnReturnClick(dispatch)} className="icon" />
          {TextResources.Account_Import_Library_File}
        </HeaderBox>
        <ButtonBox>
          <Button onClick={() => openFileSelector()} type={buttonBrowseText()} />
        </ButtonBox>
        <ButtonBox left>
          <Button onClick={() => OnReturnClick(dispatch)} type={TextResources.Account_Cancel} />
        </ButtonBox>
        {plainFiles?.length > 0 && data() && (
          <ButtonBox>
            <Button onClick={() => OnSaveClick(dispatch, data)} type={TextResources.Account_Import_Lib_Label} />
          </ButtonBox>
        )}
      </ProjectBody>
    </ProjectBox>
  );
};

export default ImportFileLibraryMenu;
