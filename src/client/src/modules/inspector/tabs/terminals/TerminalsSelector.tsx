import { useState } from "react";
import { Connector } from "../../../../models";
import ActiveTerminalsList from "./ActiveTerminalsList";
import { FilterBySearchString } from "./helpers";
import { TerminalsColumn } from "./styled";
import TerminalsSearchBar from "./TerminalsSearchBar";

interface Props {
  terminals: Connector[];
  selectedTerminalId: string;
  onItemSelect: (item: any) => void;
}

function TerminalsSelector({
  terminals,
  selectedTerminalId,
  onItemSelect,
}: Props) {
  const [searchString, setSearchString] = useState("");

  const filteredTerminals = FilterBySearchString(terminals, searchString);

  const onChange = (value: string) => {
    setSearchString(value);
  };

  return (
    <TerminalsColumn>
      <TerminalsSearchBar searchString={searchString} onChange={onChange} />
      <ActiveTerminalsList
        items={filteredTerminals}
        selectedTerminalId={selectedTerminalId}
        onItemSelect={onItemSelect}
      />
    </TerminalsColumn>
  );
}

export default TerminalsSelector;
