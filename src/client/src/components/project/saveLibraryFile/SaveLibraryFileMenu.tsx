import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { MENU_TYPE } from "../../../models/project";
import { CloseIcon } from "../../../assets/icons/common";
import { TextResources } from "../../../assets/text";
import { changeMenu } from "../../../redux/store/projectMenu/actions";
import { useState } from "react";
import { Input, Label, Size } from "../../../compLibrary";
import { Button } from "../../../compLibrary/buttons";
import { exportLibrary } from "../../../redux/store/library/actions";
import {
  ProjectBody,
  ProjectBox,
  HeaderBox,
  ButtonBox,
} from "../../../compLibrary/box/project";

export const SaveLibraryFileMenu = () => {
  const dispatch = useDispatch();
  const [fileName, setFileName] = useState("");

  const isOpen = useSelector<RootState>(
    (state) =>
      state.menu.list.find((x) => x.type === MENU_TYPE.SAVE_LIBRARY_FILE_MENU)
        ?.visible
  ) as boolean;

  const onReturnClick = () => {
    dispatch(changeMenu(MENU_TYPE.SAVE_LIBRARY_FILE_MENU, false));
  };

  const onSaveClick = () => {
    dispatch(exportLibrary(fileName));
    dispatch(changeMenu(MENU_TYPE.SAVE_LIBRARY_FILE_MENU, false));
    dispatch(changeMenu(MENU_TYPE.ACCOUNT_MENU, false));
  };

  return (
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
          {TextResources.Account_Save_Label_Library_File}
        </HeaderBox>
        <Label>{TextResources.Account_Save_Label_File_Name}</Label>
        <Input
          onChange={(e: any) => setFileName(e.target.value)}
          inputType="text"
          placeholder={TextResources.Account_Save_Label_File_Name}
          value={fileName}
        />
        <ButtonBox left>
          <Button onClick={onReturnClick} type={TextResources.Account_Cancel} />
        </ButtonBox>
        {fileName && (
          <ButtonBox>
            <Button
              onClick={onSaveClick}
              type={TextResources.Account_Save_Label_File_Library_Button}
            />
          </ButtonBox>
        )}
      </ProjectBody>
    </ProjectBox>
  );
};

export default SaveLibraryFileMenu;
