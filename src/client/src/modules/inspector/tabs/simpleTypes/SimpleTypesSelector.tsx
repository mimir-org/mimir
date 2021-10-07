import { useState } from "react";
import { ActiveSimpleTypesList, SimpleTypesSearchBar } from "./";
import { TerminalsColumn } from "../terminals/styled";
import { Composite } from "../../../../models";

interface Props {
  simpleTypes: Composite[];
  onSelect: (item: Composite) => void;
}

function SimpleTypesSelector({ simpleTypes, onSelect }: Props) {
  const [searchString, setSearchString] = useState("");
  const onChange = (value: string) => {
    setSearchString(value);
  };

  return (
    <TerminalsColumn>
      <SimpleTypesSearchBar searchString={searchString} onChange={onChange} />
      <ActiveSimpleTypesList simpleTypes={simpleTypes} onSelect={onSelect} />
    </TerminalsColumn>
  );
}

export default SimpleTypesSelector;
