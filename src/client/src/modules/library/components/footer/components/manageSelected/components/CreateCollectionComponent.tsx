import { Dispatch } from "redux";
import { Button } from "../../../../../../../compLibrary/buttons/standard";
import { Input } from "../../../../../../../compLibrary/input/text";
import { CreateCollectionWrapper, CollectionNameInput } from "./CreateCollectionComponent.styled";
import { OnCreateCollection } from "../handlers";
import { NodeLibCm } from "@mimirorg/typelibrary-types";

interface Props {
  collectionName: string;
  setCollectionName: (value: string) => void;
  selectedTypes: NodeLibCm[];
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
