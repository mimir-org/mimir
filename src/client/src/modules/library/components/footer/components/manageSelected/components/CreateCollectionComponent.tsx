import { Dispatch } from "redux";
import { Button } from "../../../../../../../compLibrary/buttons";
import { Input } from "../../../../../../../compLibrary/input/text";
import { LibItem } from "../../../../../../../models";
import { CreateCollectionWrapper, CollectionNameInput } from "../ManageSelectedTypes.styled";
import { OnCreateCollection } from "../handlers";

interface Props {
  collectionName: string;
  setCollectionName: (value: React.SetStateAction<string>) => void;
  selectedTypes: LibItem[];
  dispatch: Dispatch;
}

export const CreateCollectionComponent = ({ collectionName, setCollectionName, selectedTypes, dispatch }: Props) => (
  <CreateCollectionWrapper>
    <CollectionNameInput>
      <Input
        type="text"
        value={collectionName}
        placeholder="Type new Collection name"
        onChange={(e) => setCollectionName(e.target.value)}
      />
    </CollectionNameInput>
    <Button
      onClick={() => OnCreateCollection(collectionName, selectedTypes, dispatch)}
      text={"Create and add"}
      disabled={collectionName === ""}
    />
  </CreateCollectionWrapper>
);
