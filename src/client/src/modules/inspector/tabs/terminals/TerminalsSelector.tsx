import { useMemo, useState } from "react";
import { TerminalCategory } from "../../../../typeEditor/helpers/GetFilteredTerminalsList";
import { ActiveTerminalsList, TerminalsSearchBar } from "./";
import { FilterBySearchString } from "./helpers";
import { TerminalsColumn } from "./styled";
import { SelectedTerminalIdentifier, TerminalLikeItem } from "../../types";

interface Props {
  terminals: TerminalLikeItem[];
  terminalCategories: TerminalCategory[];
  selectedTerminal: TerminalLikeItem;
  selectedTerminalIdentifier: SelectedTerminalIdentifier;
  onSelectTerminal: (identifier: SelectedTerminalIdentifier) => void;
}

function TerminalsSelector({
  terminals,
  terminalCategories,
  selectedTerminal,
  selectedTerminalIdentifier,
  onSelectTerminal,
}: Props) {
  const [searchString, setSearchString] = useState("");
  const filteredTerminals = useMemo(
    () => FilterBySearchString(terminals, terminalCategories, searchString),
    [terminals, terminalCategories, searchString]
  );

  return (
    <TerminalsColumn>
      <TerminalsSearchBar searchString={searchString} onChange={(value) => setSearchString(value)} />
      <ActiveTerminalsList
        terminals={filteredTerminals}
        terminalCategories={terminalCategories}
        selectedTerminal={selectedTerminal}
        selectedTerminalIdentifier={selectedTerminalIdentifier}
        onSelectTerminal={onSelectTerminal}
      />
    </TerminalsColumn>
  );
}

export default TerminalsSelector;
