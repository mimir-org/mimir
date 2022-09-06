import { ChangeEvent, useMemo, useState } from "react";
import { TerminalsCategoryList } from "./components/TerminalsList";
import { TerminalsColumn } from "../../../shared/styled/TerminalsColumn";
import { FontSize, FontWeight } from "../../../../../../../../assets/font";
import { TextResources } from "../../../../../../../../assets/text/TextResources";
import { Input } from "../../../../../../../../compLibrary/input/text";
import { Terminal } from "@mimirorg/modelbuilder-types";
import { FilterBySearchString } from "../../helpers/FilterBySearchString";
import { CategoryObject } from "./components/helpers/PopulateTerminalCategories";

interface Props {
  terminals: Terminal[];
  terminalCategories: CategoryObject[];
  selectedTerminalId: string;
  onSelectTerminal: (id: string) => void;
}

/**
 * Component for the terminals search in the Terminals tab in the Inspector
 * @param props
 * @returns an input field for search and a list of terminals.
 */
export const TerminalsSelector = ({ terminals, terminalCategories, selectedTerminalId, onSelectTerminal }: Props) => {
  const [searchString, setSearchString] = useState("");

  const filteredBySearchTerminals = useMemo(
    () => FilterBySearchString(terminals, terminalCategories, searchString),
    [terminals, terminalCategories, searchString]
  );

  const hasTerminals = filteredBySearchTerminals?.length > 0;
  const className = searchString.length < 1 ? "" : TextResources.INPUT_PLACEHOLDER;

  return (
    <TerminalsColumn>
      <Input
        fontSize={FontSize.STANDARD}
        fontStyle={FontWeight.ITALIC}
        className={className}
        value={searchString}
        placeholder={TextResources.TERMINALS_SEARCH}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchString(e.currentTarget.value)}
      />
      {hasTerminals && (
        <TerminalsCategoryList
          filteredTerminals={filteredBySearchTerminals}
          terminalCategories={terminalCategories}
          selectedTerminalId={selectedTerminalId}
          onSelectTerminal={(id: string) => onSelectTerminal(id)}
        />
      )}
    </TerminalsColumn>
  );
};
