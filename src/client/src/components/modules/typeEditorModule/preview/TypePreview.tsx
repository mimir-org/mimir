import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../redux/store";
import { TypeEditorState } from "../../../../redux/store/typeEditor/types";

import { ListHeader } from "../lists/ListHeader";
import { PreviewBody } from "../preview/PreviewBody";
import { PreviewInstruction } from "../styled";
import { ListWrapper } from "../../../../compLibrary";
import { AddEditButton } from "../../../../compLibrary/buttons";
import { TextResources } from "../../../../assets/textResources";
import { AddIcon, CheckmarkIcon } from "../../../../assets/icons/common";
import { create, update } from "../../../../redux/store/typeEditor/actions";

export const TypePreview = () => {
  const dispatch = useDispatch();

  const state = useSelector<RootState>(
    (state) => state.typeEditor
  ) as TypeEditorState;

  const saveClick = (mode) => {
    if(mode === "new"){
      dispatch(create(state.createLibraryType));
    } else if (mode === "edit"){
      dispatch(update(state.createLibraryType));
    }

  };

  return (
    <>
      <ListWrapper flex={0.7} right={0}>
        <ListHeader
          label={TextResources.TypeEditor_New_Type_Preview}
          chooseVisible={false}
        />
        <PreviewBody />
        <PreviewInstruction>
          {TextResources.TypeEditor_Preview_Info}
        </PreviewInstruction>
        <AddEditButton>
          <p onClick={()=>{saveClick(state.mode)}}>
            {state.mode === "new"
              ? TextResources.TypeEditor_Button_Add
              : TextResources.TypeEditor_Button_Edit}
          </p>
          <img
            src={state.mode === "new" ? AddIcon : CheckmarkIcon}
            alt="icon"
            className="icon"
          />
        </AddEditButton>
      </ListWrapper>
    </>
  );
};

export default TypePreview;
