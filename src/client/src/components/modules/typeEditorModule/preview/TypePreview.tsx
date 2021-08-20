import { useDispatch } from "react-redux";
import { TypeEditorState } from "../../../../redux/store/typeEditor/types";
import { ListHeader } from "../lists/ListHeader";
import { PreviewBody } from "../preview/PreviewBody";
import { ListWrapper } from "../../../../compLibrary";
import { SaveButton } from "../../../../compLibrary/buttons";
import { TextResources } from "../../../../assets/text";
import { create, update } from "../../../../redux/store/typeEditor/actions";
import { TypeMode } from "../../../../models";
import { GetValidationMessage } from "../validators";
import { useState } from "react";
import { ErrorMessageBox } from "../styled";
import { AddIcon, CheckIcon, CloseIcon } from "../../../../assets/icons/common";
import { ModeEdit, ModeNew } from "../helpers";

interface Props {
  state: TypeEditorState;
  disabled: boolean;
}

export const TypePreview = ({ state, disabled }: Props) => {
  const dispatch = useDispatch();
  const validationMessages = GetValidationMessage(state);
  const [showBox, setShowBox] = useState(false);

  const onSaveClick = (mode: TypeMode) => {
    if (validationMessages.length === 0) {
      setShowBox(false);
      if (ModeNew(mode)) {
        dispatch(create(state.createLibraryType));
      } else if (ModeEdit(mode)) {
        // console.log(state.selectedType);
        dispatch(update(state.selectedType, state.selectedNode));
      }
    } else {
      setShowBox(true);
    }
  };

  const onBoxClick = () => {
    setShowBox(false);
  };

  return (
    <ListWrapper flex={0.7} right={0}>
      <ListHeader
        label={TextResources.TypeEditor_New_Type_Preview}
        chooseVisible={false}
      />
      <PreviewBody state={state} />
      <div className="text">{TextResources.TypeEditor_Preview_Info}</div>
      <SaveButton
        disabled={disabled}
        onClick={
          disabled
            ? null
            : () => {
                onSaveClick(state.mode);
              }
        }
      >
        <p>
          {ModeNew(state.mode)
            ? TextResources.TypeEditor_Button_Add
            : TextResources.TypeEditor_Button_Edit}
        </p>
        <img
          src={ModeNew(state.mode) ? AddIcon : CheckIcon}
          alt="icon"
          className="icon"
        />
      </SaveButton>
      {showBox && validationMessages.length > 0 && (
        <ErrorMessageBox>
          <img
            src={CloseIcon}
            alt="icon"
            onClick={onBoxClick}
            className="icon"
          />
          {validationMessages.map((message) => (
            <p className="message" key={message}>
              {message}
            </p>
          ))}
        </ErrorMessageBox>
      )}
    </ListWrapper>
  );
};

export default TypePreview;
