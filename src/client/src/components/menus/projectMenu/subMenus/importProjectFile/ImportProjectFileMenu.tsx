import { isActiveMenuSelector, useAppDispatch, useParametricAppSelector } from "../../../../../redux/store";
import { MENU_TYPE } from "../../../../../models/project";
import { FileData } from "../../../../../models";
import { ProjectAm } from "../../../../../redux/sagas/project/ConvertProject";
import { CloseIcon } from "../../../../../assets/icons/close";
import { TextResources } from "../../../../../assets/text";
import { Button } from "../../../../../compLibrary/buttons";
import { useFilePicker } from "use-file-picker";
import { OnReturnClick, OnProjectSaveClick } from "./handlers";
import { ProjectBody, ProjectBox, HeaderBox, ButtonBox } from "../styled";
import { ImportProjectIcon } from "../../../../../assets/icons/project";

export const ImportProjectFileMenu = () => {
  const dispatch = useAppDispatch();
  const isOpen = useParametricAppSelector(isActiveMenuSelector, MENU_TYPE.IMPORT_PROJECT_FILE_MENU);

  const [openFileSelector, { filesContent, plainFiles }] = useFilePicker({
    multiple: false,
    readAs: "Text",
    accept: [".json"],
    limitFilesConfig: { min: 1, max: 1 },
  });

  const data = () => {
    if (!filesContent || filesContent.length <= 0) return null;
    const fileData = filesContent[0] as FileData;
    return JSON.parse(fileData.content) as ProjectAm;
  };

  const buttonBrowseText = () => {
    if (plainFiles?.length < 1) return TextResources.Project_Import;
    return plainFiles[0].name;
  };

  return (
    <ProjectBox visible={isOpen}>
      <ProjectBody>
        <HeaderBox>
          <img src={CloseIcon} alt="Close project" onClick={() => OnReturnClick(dispatch)} className="icon" />
          {TextResources.Project_Import_File}
        </HeaderBox>
        <ButtonBox>
          <Button onClick={() => openFileSelector()} text={buttonBrowseText()} icon={ImportProjectIcon} />
        </ButtonBox>
        <ButtonBox left>
          <Button onClick={() => OnReturnClick(dispatch)} text={TextResources.Project_Cancel} />
        </ButtonBox>
        {plainFiles?.length > 0 && data() && (
          <ButtonBox>
            <Button
              onClick={() => OnProjectSaveClick(dispatch, data)}
              text={TextResources.Project_Import}
              icon={ImportProjectIcon}
            />
          </ButtonBox>
        )}
      </ProjectBody>
    </ProjectBox>
  );
};

export default ImportProjectFileMenu;
