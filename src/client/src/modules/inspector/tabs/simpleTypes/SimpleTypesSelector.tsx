import { ChangeEvent, useState } from "react";
import { ActiveSimpleTypesList } from "./";
import { TerminalsColumn } from "../terminals/styled";
import { CompositeLikeItem } from "../../types";
import { FontSize } from "../../../../compLibrary/font";
import { TextResources } from "../../../../assets/text";
import { Input } from "../../../../compLibrary/input/text";

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
      <Input
        fontSize={FontSize.Standard}
        fontStyle={"italic"}
        className={searchString.length > 0 ? "" : "input-placeholder"}
        value={searchString}
        placeholder={TextResources.Inspector_SimpleTypes_Search}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.currentTarget.value)}
      />
      <ActiveSimpleTypesList simpleTypes={simpleTypes} selectedSimpleTypeId={selectedSimpleTypeId} onSelect={onSelect} />
    </TerminalsColumn>
  );
}

export default SimpleTypesSelector;
