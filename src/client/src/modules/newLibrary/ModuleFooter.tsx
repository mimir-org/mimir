import { NewType, EditType, DeleteType } from "../../assets/icons/library";
import { TextResources } from "../../assets/text";
import { Button } from "../../compLibrary/buttons";
import { CollectionsActions, LibraryTab } from "../../models";
import { LibFooter, LibFooterButtonsWrapper } from "./styled";
import { GetCollectionIcon } from "./tabs/Collections/helpers";

interface Props {
  libOpen: boolean;
  activeTab: LibraryTab;
  setCollectionState: (action: CollectionsActions) => void;
}

const ModuleFooter = ({ libOpen, activeTab, setCollectionState }: Props) => {
  return (
    <LibFooter libOpen={libOpen}>
      <LibFooterButtonsWrapper>
        <Button onClick={() => null} text={TextResources.Library_New_Type} icon={NewType} />
        <Button onClick={() => null} text={TextResources.Library_Edit_Type} icon={EditType} />
      </LibFooterButtonsWrapper>
      <LibFooterButtonsWrapper>
        <Button onClick={() => null} text={TextResources.Library_Delete_Type} icon={DeleteType} />
        <Button
          onClick={() => setCollectionState(CollectionsActions.Manage)}
          text={TextResources.Library_Manage_Collections_Button}
          icon={GetCollectionIcon(activeTab)}
        />
      </LibFooterButtonsWrapper>
    </LibFooter>
  );
};

export default ModuleFooter;
