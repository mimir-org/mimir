import { useDispatch } from "react-redux";
import { TypeEditorState } from "../../../../redux/store/typeEditor/types";
import { ListHeader } from "../lists/ListHeader";
import { PreviewBody } from "../preview/PreviewBody";
import { ListWrapper } from "../../../../compLibrary";
import { SaveButton } from "../../../../compLibrary/buttons";
import { TextResources } from "../../../../assets/text";
import { AddIcon, CheckmarkIcon } from "../../../../assets/icons/common";
import { create, update } from "../../../../redux/store/typeEditor/actions";
import { TypeMode } from "../../../../models";
import { GetValidationMessage, ValidateType } from "../validators";
import { useState } from "react";
import { ErrorMessageBox } from "../styled";

interface Props {
  state: TypeEditorState;
}

export const TypePreview = ({ state }: Props) => {
  const dispatch = useDispatch();
  const [validated, setValidated] = useState(true);

  const onSaveClick = (mode: TypeMode) => {
    if (ValidateType(state)) {
      if (mode === TypeMode.New) {
        dispatch(create(state.createLibraryType));
      } else if (mode === TypeMode.Edit) {
        dispatch(update(state.createLibraryType));
      }
    } else setValidated(false);
  };

  return (
    <ListWrapper flex={0.7} right={0}>
      <ListHeader
        label={TextResources.TypeEditor_New_Type_Preview}
        chooseVisible={false}
      />
      <PreviewBody state={state} />
      <div className="text">{TextResources.TypeEditor_Preview_Info}</div>
      <SaveButton>
        <p
          onClick={() => {
            onSaveClick(state.mode);
          }}
        >
          {state.mode === TypeMode.New
            ? TextResources.TypeEditor_Button_Add
            : TextResources.TypeEditor_Button_Edit}
        </p>
        <img
          src={state.mode === TypeMode.New ? AddIcon : CheckmarkIcon}
          alt="icon"
          className="icon"
        />
      </SaveButton>
      {!validated && (
        <ErrorMessageBox>
          {GetValidationMessage(state).map((message) => (
            <p key={message}>{message}</p>
          ))}
        </ErrorMessageBox>
      )}
    </ListWrapper>
  );
};

export default TypePreview;
