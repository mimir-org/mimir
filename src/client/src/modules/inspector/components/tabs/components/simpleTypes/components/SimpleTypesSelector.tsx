import { ChangeEvent, useState } from "react";
import { ActiveSimpleTypesList } from "./ActiveSimpleTypesList";
import { TerminalsColumn } from "../../shared/styled/TerminalsColumn";
import { SimpleLikeItem } from "../../../../../types";
import { FontSize } from "../../../../../../../compLibrary/font";
import { TextResources } from "../../../../../../../assets/text/TextResources";
import { Input } from "../../../../../../../compLibrary/input/text";

interface Props {
  simpleTypes: SimpleLikeItem[];
  selectedSimpleTypeId: string;
  onSelect: (item: SimpleLikeItem) => void;
}

export const SimpleTypesSelector = ({ simpleTypes, onSelect, selectedSimpleTypeId }: Props) => {
  const [searchString, setSearchString] = useState("");
  const onChange = (value: string) => {
    setSearchString(value);
  };

  return (
    <TerminalsColumn>
      <Input
        fontSize={FontSize.STANDARD}
        fontStyle={"italic"}
        className={searchString.length > 0 ? "" : "input-placeholder"}
        value={searchString}
        placeholder={TextResources.SIMPLETYPES_SEARCH}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.currentTarget.value)}
      />
      <ActiveSimpleTypesList simpleTypes={simpleTypes} selectedSimpleTypeId={selectedSimpleTypeId} onSelect={onSelect} />
    </TerminalsColumn>
  );
};
