import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { MENU_TYPE } from "../../../models/project";
import { FileData } from "../../../models";
import { ProjectAm } from "../../../redux/sagas/project/ConvertProject";
import { CloseIcon } from "../../../assets/icons/common";
import { TextResources } from "../../../assets/text";
import { Size } from "../../../compLibrary";
import { Button } from "../../../compLibrary/buttons";
import { useFilePicker } from "use-file-picker";
import { OnReturnClick, OnProjectSaveClick } from "./handlers";
import { ProjectBody, ProjectBox, HeaderBox, ButtonBox } from "../../../compLibrary/box/project";

export const ImportProjectFileMenu = () => {
  const dispatch = useDispatch();

  const isOpen = useSelector<RootState>(
    (state) => state.menu.list.find((x) => x.type === MENU_TYPE.IMPORT_PROJECT_FILE_MENU)?.visible
  ) as boolean;

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
    if (plainFiles?.length < 1) return TextResources.Account_Import_File;
    return plainFiles[0].name;
  };

  return (
    <ProjectBox width={Size.MenuSmall_Width} height={Size.MenuSmall_Height} visible={isOpen}>
      <ProjectBody>
        <HeaderBox>
          <img
            src={CloseIcon}
            alt="Close project"
            onClick={() => OnReturnClick(dispatch)}
            className="icon"
          />
          {TextResources.Account_Import_File}
        </HeaderBox>
        <ButtonBox>
          <Button onClick={() => openFileSelector()} type={buttonBrowseText()} />
        </ButtonBox>
        <ButtonBox left>
          <Button onClick={() => OnReturnClick(dispatch)} type={TextResources.Account_Cancel} />
        </ButtonBox>
        {plainFiles?.length > 0 && data() && (
          <ButtonBox>
            <Button
              onClick={() => OnProjectSaveClick(dispatch, data)}
              type={TextResources.Account_Import_Label_File_Button}
            />
          </ButtonBox>
        )}
      </ProjectBody>
    </ProjectBox>
  );
};

export default ImportProjectFileMenu;
