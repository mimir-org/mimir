import { Terminal } from "@mimirorg/modelbuilder-types";
import { TerminalElement } from "./components/TerminalElement";

interface Props {
  terminals: Terminal[];
  selectedTerminal: string;
  visible: boolean;
  onSelect: (id: string) => void;
}

export const TerminalElementList = ({ terminals, selectedTerminal, visible, onSelect }: Props) => {
  const sortedTerminals = terminals?.sort((a, b) => a.name.localeCompare(b.name));
  return (
    <>
      {visible &&
        sortedTerminals &&
        sortedTerminals.map((terminal) => {
          return (
            <TerminalElement
              key={terminal.id}
              terminal={terminal}
              selectedTerminalId={selectedTerminal}
              onSelectTerminal={(id: string) => onSelect(id)}
            />
          );
        })}
    </>
  );
};
