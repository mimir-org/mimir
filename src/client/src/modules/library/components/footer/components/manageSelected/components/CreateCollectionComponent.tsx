import { Dispatch } from "redux";
import { Button } from "../../../../../../../compLibrary/buttons";
import { Input } from "../../../../../../../compLibrary/input/text";
import { CreateCollectionWrapper, CollectionNameInput } from "./CreateCollectionComponent.styled";
import { OnCreateCollection } from "../handlers";

interface Props {
  collectionName: string;
  setCollectionName: (value: string) => void;
  dispatch: Dispatch;
}

export const CreateCollectionComponent = ({ collectionName, setCollectionName, dispatch }: Props) => (
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
      onClick={() => OnCreateCollection(collectionName, dispatch)}
      text={"Create and add"}
      disabled={collectionName === ""}
    />
  </CreateCollectionWrapper>
);
