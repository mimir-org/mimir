import { ChangeEvent, useMemo, useState } from "react";
import { ActiveTerminalsList } from "./components/ActiveTerminalsList";
import { FilterBySearchString } from "./helpers/FilterBySearchString";
import { TerminalsColumn } from "../../../shared/styled/TerminalsColumn";
import { SelectedTerminalIdentifier, TerminalLikeItem } from "../../../../../../types";
import { FontSize } from "../../../../../../../../assets/font";
import { TextResources } from "../../../../../../../../assets/text/TextResources";
import { Input } from "../../../../../../../../compLibrary/input/text";
import { TerminalCategory } from "../../helpers/GetFilteredTerminalsList";

interface Props {
  terminals: TerminalLikeItem[];
  terminalCategories: TerminalCategory[];
  selectedTerminal: TerminalLikeItem;
  selectedTerminalIdentifier: SelectedTerminalIdentifier;
  onSelectTerminal: (identifier: SelectedTerminalIdentifier) => void;
}

export const TerminalsSelector = ({
  terminals,
  terminalCategories,
  selectedTerminal,
  selectedTerminalIdentifier,
  onSelectTerminal,
}: Props) => {
  const [searchString, setSearchString] = useState("");

  const filteredTerminals = useMemo(
    () => FilterBySearchString(terminals, terminalCategories, searchString),
    [terminals, terminalCategories, searchString]
  );

  return (
    <TerminalsColumn>
      <Input
        fontSize={FontSize.STANDARD}
        fontStyle={"italic"}
        className={searchString.length > 0 ? "" : "input-placeholder"}
        value={searchString}
        placeholder={TextResources.TERMINALS_SEARCH}
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
};
