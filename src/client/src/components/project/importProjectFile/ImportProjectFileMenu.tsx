import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { MENU_TYPE } from "../../../models/project";
import { FileData } from "../../../models";
import { ProjectAm } from "../../../redux/sagas/project/ConvertProject";
import { CloseIcon, RightArrowIcon } from "../../../assets/icons/common";
import { TextResources } from "../../../assets/text";
import { changeMenu } from "../../../redux/store/projectMenu/actions";
import { Size } from "../../../compLibrary";
import { MenuButton, AddEditButton } from "../../../compLibrary/buttons";
import { importProjectAction } from "../../../redux/store/project/actions";
import { useFilePicker } from "use-file-picker";
import {
  ProjectBody,
  ProjectBox,
  HeaderBox,
  ButtonBox,
} from "../../../compLibrary/box/project";

export const ImportProjectFileMenu = () => {
  const dispatch = useDispatch();

  const isOpen = useSelector<RootState>(
    (state) =>
      state.menu.list.find((x) => x.type === MENU_TYPE.IMPORT_PROJECT_FILE_MENU)
        ?.visible
  ) as boolean;

  const [openFileSelector, { filesContent, plainFiles }] = useFilePicker({
    multiple: false,
    readAs: "Text",
    accept: [".json"],
    limitFilesConfig: { min: 1, max: 1 },
  });

  const onReturnClick = () => {
    dispatch(changeMenu(MENU_TYPE.IMPORT_PROJECT_FILE_MENU, false));
  };

  const data = () => {
    if (!filesContent || filesContent.length <= 0) return null;

    const fileData = filesContent[0] as FileData;
    return JSON.parse(fileData.content) as ProjectAm;
  };

  const buttonBrowseText = () => {
    if (plainFiles && plainFiles.length < 1)
      return TextResources.Account_Import_Label_File_Browse_Button;
    return plainFiles[0].name;
  };

  const onProjectSaveClick = () => {
    const project = data();
    dispatch(importProjectAction(project));
    dispatch(changeMenu(MENU_TYPE.IMPORT_PROJECT_FILE_MENU, false));
    dispatch(changeMenu(MENU_TYPE.ACCOUNT_MENU, false));
  };

  return (
    <>
      <ProjectBox
        width={Size.MenuSmall_Width}
        height={Size.MenuSmall_Height}
        visible={isOpen}
      >
        <ProjectBody>
          <HeaderBox>
            <img
              src={CloseIcon}
              alt="Close project"
              onClick={onReturnClick}
              className="icon"
            />
            {TextResources.Account_Import_Label_File}
          </HeaderBox>
          <AddEditButton onClick={() => openFileSelector()}>
            {buttonBrowseText()}
          </AddEditButton>

          <ButtonBox left>
            <MenuButton onClick={onReturnClick}>
              <p>{TextResources.Account_Cancel_Button}</p>
            </MenuButton>
          </ButtonBox>
          {plainFiles && plainFiles.length > 0 && data() && (
            <ButtonBox>
              <MenuButton onClick={onProjectSaveClick} wide>
                <p>{TextResources.Account_Import_Label_File_Button}</p>
                <img
                  src={RightArrowIcon}
                  alt="Import project"
                  className="icon"
                />
              </MenuButton>
            </ButtonBox>
          )}
        </ProjectBody>
      </ProjectBox>
    </>
  );
};

export default ImportProjectFileMenu;
