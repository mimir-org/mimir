import { NodeBox, SymbolBox, LogoBox } from "./BlockNode.styled";
import { Symbol } from "compLibrary/symbol";
import { useState } from "react";
import { BlockChildHeader } from "./BlockChildHeader";
import { useCompanySelector } from "../../../../../hooks/useCompanySelector";
import { AspectObject, Connector } from "lib";

interface Props {
  node: AspectObject;
  colorMain: string;
  colorSelected: string;
  isElectroView: boolean;
  inputConnectors: Connector[];
  outputConnectors: Connector[];
  onClickTerminalChecked: (terminalId: string, checked: boolean) => void;
  onClickAddTerminal: (terminalId: string) => void;
  onClickRemoveTerminal: (terminalId: string) => void;
}

/**
 * Component for the child block node in BlockView.
 * @returns a child container with terminals menus and terminals.
 */
export const BlockChildComponent = ({
  node,
  colorMain,
  colorSelected,
  isElectroView,
  inputConnectors,
  outputConnectors,
  onClickTerminalChecked,
  onClickAddTerminal,
  onClickRemoveTerminal,
}: Props) => {
  const [showMenuButton, setShowMenuButton] = useState(false);
  const company = useCompanySelector(node.domain, node.id);

  const ShowTerminalButton = (status: boolean) => {
    setShowMenuButton(status);
  };

  return (
    <NodeBox
      node={node}
      colorMain={colorMain}
      colorSelected={colorSelected}
      selected={node.selected}
      onMouseEnter={() => ShowTerminalButton(true)}
      onMouseLeave={() => ShowTerminalButton(false)}
    >
      <BlockChildHeader
        node={node}
        isElectroView={isElectroView}
        inputConnectors={inputConnectors}
        outputConnectors={outputConnectors}
        onClickTerminalChecked={onClickTerminalChecked}
        showMenuButton={showMenuButton}
        onClickAddTerminal={onClickAddTerminal}
        onClickRemoveTerminal={onClickRemoveTerminal}
      />
      <SymbolBox>
        <Symbol source={node.symbol} text={node.name} />
      </SymbolBox>
      <LogoBox>
        <img src={company.logo} alt={company.name} />
      </LogoBox>
    </NodeBox>
  );
};
