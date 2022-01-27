import { Movable } from "../../../../assets/icons/library";
import { Color } from "../../../../compLibrary/colors";
import { Icon } from "../../../../compLibrary/icon";
import { Checkbox } from "../../../../compLibrary/input/checkbox/common";
import { CollectionsActions, LibraryTab } from "../../../../models";
import { GetCollectionIcon } from "./helpers";
import { CollectionBox } from "./styled";

interface Props {
  id: string;
  name: string;
  checked: boolean;
  typeCategories: string[];
  collectionState: CollectionsActions;
  activeTab: LibraryTab;
  onChange: (action: string, id: string) => void;
}

const Collection = ({ id, name, checked, typeCategories, collectionState, activeTab, onChange }: Props) => {
  const onCheckboxChange = () => {
    if (checked) {
      onChange("remove", id);
    } else {
      onChange("add", id);
    }
  };
  return (
    <CollectionBox manageCollections={collectionState === CollectionsActions.Manage}>
      <Icon size={24} src={GetCollectionIcon(activeTab)} className="collections" alt="Library-icon" />
      <p>{name}</p>
      <span>{typeCategories}</span>
      {collectionState === CollectionsActions.Manage && (
        <>
          <Checkbox isChecked={checked ?? false} onChange={onCheckboxChange} color={Color.BlueMagenta} />
          <Icon size={18} src={Movable} className="movable" alt="Movable-icon" />
        </>
      )}
    </CollectionBox>
  );
};

export default Collection;
