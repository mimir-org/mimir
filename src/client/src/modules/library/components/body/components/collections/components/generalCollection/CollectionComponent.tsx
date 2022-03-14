import { Icon } from "../../../../../../../../compLibrary/icon";
import { ColoredCollections } from "../../../../../../../../assets/icons/library";
import { Checkbox } from "../../../../../../../../compLibrary/input/checkbox/common";
import { Color } from "../../../../../../../../compLibrary/colors";
import { Collection, CollectionsActions } from "../../../../../../../../models";
import { CollectionComponentButton, CollectionComponentIcon, CollectionComponentText } from "./CollectionComponent.styled";

interface Props {
  collection: Collection;
  collectionState: CollectionsActions;
}

export const CollectionComponent = ({ collection, collectionState }: Props) => {
  const isSelected = false;
  return (
    <CollectionComponentButton>
      <CollectionComponentIcon>
        <Icon size={20} src={ColoredCollections} alt="collection" draggable="false" />
      </CollectionComponentIcon>
      <CollectionComponentText>{collection.name}</CollectionComponentText>
      {collectionState === CollectionsActions.ManageCollection && (
        <Checkbox isChecked={isSelected} onChange={() => null} color={Color.Black} />
      )}
    </CollectionComponentButton>
  );
};
