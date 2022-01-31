import { Dispatch } from "redux";
import { NewType, EditType, DeleteType } from "../../assets/icons/library";
import { TextResources } from "../../assets/text";
import { Button } from "../../compLibrary/buttons";
import { CollectionsActions, LibraryTab, ObjectType } from "../../models";
import { OnOpenTypeEditor } from "../../typeEditor/handlers";
import { OnDeleteTypeClick } from "./handlers";
import { LibFooter, LibFooterButtonsWrapper } from "./styled";
// import { GetCollectionIcon } from "./tabs/Collections/helpers";

interface Props {
  libOpen: boolean;
  activeTab: LibraryTab;
  setCollectionState: (action: CollectionsActions) => void;
  selectedElement: string;
  selectedElementType: ObjectType;
  onChange: () => void;
  dispatch: Dispatch;
}

const ModuleFooter = ({
  libOpen,
  // activeTab,
  // setCollectionState,
  selectedElement,
  selectedElementType,
  onChange,
  dispatch,
}: Props) => {
  return (
    <LibFooter libOpen={libOpen}>
      <LibFooterButtonsWrapper>
        <Button
          onClick={() => OnOpenTypeEditor(selectedElement, selectedElementType, onChange, dispatch)}
          text={TextResources.Library_New_Type}
          icon={NewType}
        />
        <Button
          onClick={() => OnOpenTypeEditor(selectedElement, selectedElementType, onChange, dispatch)}
          text={TextResources.Library_Edit_Type}
          icon={EditType}
          disabled={selectedElement === ""}
        />
      </LibFooterButtonsWrapper>
      <LibFooterButtonsWrapper>
        <Button
          onClick={() => OnDeleteTypeClick(selectedElement, dispatch)}
          text={TextResources.Library_Delete_Type}
          icon={DeleteType}
          disabled={selectedElement === ""}
        />
        {/* <Button
          onClick={() => setCollectionState(CollectionsActions.Manage)}
          text={TextResources.Library_Manage_Collections_Button}
          icon={GetCollectionIcon(activeTab)}
          disabled={true}
        /> */}
      </LibFooterButtonsWrapper>
    </LibFooter>
  );
};

export default ModuleFooter;
