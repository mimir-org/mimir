import { ListHeader } from "../lists/ListHeader";
import { PreviewBody } from "../preview/PreviewBody";
import { PreviewInstruction } from "../styled";
import { ListWrapper } from "../../../../componentLibrary";
import { AddEditButton } from "../../../../componentLibrary/buttons";
import { TextResources } from "../../../../assets/textResources";
import { AddIcon, CheckmarkIcon } from "../../../../assets/icons/common";

interface Props {
  mode: string;
}

export const TypePreview = ({ mode }: Props) => {
  return (
    <>
      <ListWrapper flex={1.5}>
        <ListHeader
          label={TextResources.TypeEditor_New_Type_Preview}
          chooseVisible={false}
        />
        <PreviewBody />
        <PreviewInstruction>
          {TextResources.TypeEditor_Preview_Info}
        </PreviewInstruction>
        <AddEditButton>
          <p>
            {mode === "new"
              ? TextResources.TypeEditor_Button_Add
              : TextResources.TypeEditor_Button_Edit}
          </p>
          <img
            src={mode === "new" ? AddIcon : CheckmarkIcon}
            alt="icon"
            className="icon"
          />
        </AddEditButton>
      </ListWrapper>
    </>
  );
};

export default TypePreview;
