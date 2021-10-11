import { useState } from "react";
import { TerminalCategory } from "../../../../typeEditor/helpers/GetFilteredTerminalsList";
import { Connector } from "../../../../models";
import { ActiveTerminalsList, TerminalsSearchBar } from "./";
import { FilterBySearchString } from "./helpers";
import { TerminalsColumn } from "./styled";

interface Props {
  terminals: Connector[];
  terminalCategories: TerminalCategory[];
  selectedTerminalId: string;
  onSelectTerminal: (item: any) => void;
}

function TerminalsSelector({ terminals, terminalCategories, selectedTerminalId, onSelectTerminal }: Props) {
  const [searchString, setSearchString] = useState("");
  const filteredTerminals = FilterBySearchString(terminals, terminalCategories, searchString);

  const onChange = (value: string) => {
    setSearchString(value);
  };

  return (
    <TerminalsColumn>
      <TerminalsSearchBar searchString={searchString} onChange={onChange} />
      <ActiveTerminalsList
        terminals={filteredTerminals}
        terminalCategories={terminalCategories}
        selectedTerminalId={selectedTerminalId}
        onSelectTerminal={onSelectTerminal}
      />
    </TerminalsColumn>
  );
}

export default TerminalsSelector;
