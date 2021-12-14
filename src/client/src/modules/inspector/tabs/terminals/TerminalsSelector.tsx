import { ChangeEvent, useMemo, useState } from "react";
import { TerminalCategory } from "../../../../typeEditor/helpers/GetFilteredTerminalsList";
import { ActiveTerminalsList } from "./";
import { FilterBySearchString } from "./helpers";
import { TerminalsColumn } from "./styled";
import { SelectedTerminalIdentifier, TerminalLikeItem } from "../../types";
import { FontSize } from "../../../../compLibrary/font";
import { TextResources } from "../../../../assets/text";
import { Input } from "../../../../compLibrary/input/text";

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
      <Input
        fontSize={FontSize.Standard}
        fontStyle={'italic'}
        className={searchString.length > 0 ? "" : "input-placeholder"}
        value={searchString}
        placeholder={TextResources.Inspector_Terminals_Search}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchString(e.currentTarget.value)}
      />
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
