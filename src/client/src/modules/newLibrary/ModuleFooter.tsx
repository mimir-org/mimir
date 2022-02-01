import { useState } from "react";
import { Dispatch } from "redux";
import { ConfirmDeleteType } from ".";
import { NewType, EditType, DeleteType } from "../../assets/icons/library";
import { TextResources } from "../../assets/text";
import { Button } from "../../compLibrary/buttons";
import { CollectionsActions, LibraryTab, ObjectType } from "../../models";
import { OnOpenTypeEditor } from "../../typeEditor/handlers";
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

/**
 * Footer component for Mimir's type library, templates and sub-projects
 * @param interface
 * @returns a footer with buttons based on activeTab
 */

const ModuleFooter = ({
  libOpen,
  // activeTab,
  // setCollectionState,
  selectedElement,
  selectedElementType,
  onChange,
  dispatch,
}: Props) => {
  const [confirmDeleteBox, setConfirmDeleteBox] = useState(false);
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
          onClick={() => setConfirmDeleteBox(true)}
          text={TextResources.Library_Delete_Type}
          icon={DeleteType}
          disabled={selectedElement === ""}
        />
        {confirmDeleteBox && (
          <ConfirmDeleteType
            isOpen={confirmDeleteBox}
            onExit={setConfirmDeleteBox}
            selectedElement={selectedElement}
            dispatch={dispatch}
          />
        )}
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
