import { useState } from "react";
import { ActiveSimpleTypesList, SimpleTypesSearchBar } from "./";
import { TerminalsColumn } from "../terminals/styled";
import { CompositeLikeItem } from "../../types";

interface Props {
  simpleTypes: CompositeLikeItem[];
  selectedSimpleTypeId: string;
  onSelect: (item: CompositeLikeItem) => void;
}

function SimpleTypesSelector({ simpleTypes, onSelect, selectedSimpleTypeId }: Props) {
  const [searchString, setSearchString] = useState("");
  const onChange = (value: string) => {
    setSearchString(value);
  };

  return (
    <TerminalsColumn>
      <SimpleTypesSearchBar searchString={searchString} onChange={onChange} />
      <ActiveSimpleTypesList simpleTypes={simpleTypes} selectedSimpleTypeId={selectedSimpleTypeId} onSelect={onSelect} />
    </TerminalsColumn>
  );
}

export default SimpleTypesSelector;
