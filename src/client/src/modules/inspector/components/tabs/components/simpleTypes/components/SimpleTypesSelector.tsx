import { ChangeEvent, useState } from "react";
import { ActiveSimpleTypesList } from "./ActiveSimpleTypesList";
import { TerminalsColumn } from "../../shared/styled/TerminalsColumn";
import { FontSize, FontWeight } from "../../../../../../../assets/font";
import { TextResources } from "../../../../../../../assets/text/TextResources";
import { Input } from "../../../../../../../compLibrary/input/text";
import { Simple } from "@mimirorg/modelbuilder-types";

interface Props {
  simpleTypes: Simple[];
  selectedSimpleTypeId: string;
  onSelect: (item: Simple) => void;
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
        fontStyle={FontWeight.ITALIC}
        className={searchString.length > 0 ? "" : "input-placeholder"}
        value={searchString}
        placeholder={TextResources.SIMPLETYPES_SEARCH}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.currentTarget.value)}
      />
      <ActiveSimpleTypesList simpleTypes={simpleTypes} selectedSimpleTypeId={selectedSimpleTypeId} onSelect={onSelect} />
    </TerminalsColumn>
  );
};
