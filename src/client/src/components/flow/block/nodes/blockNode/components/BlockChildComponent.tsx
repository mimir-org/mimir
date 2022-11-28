import { OnHover, OnMouseOut } from "./handlers";
import { NodeBox, SymbolBox, LogoBox } from "./BlockChildComponent.styled";
import { Symbol } from "../../../../../../compLibrary/symbol";
import { useState } from "react";
import { BlockChildHeader } from "./BlockChildHeader";
import { Node, Connector, ConnectorDirection } from "@mimirorg/modelbuilder-types";
import { commonStateCompanySelector, useAppSelector } from "../../../../../../redux/store";

interface Props {
  node: Node;
  colorMain: string;
  colorSelected: string;
  isElectroView: boolean;
  inputConnectors: Connector[];
  outputConnectors: Connector[];
  onConnectorClick: (conn: Connector, isInput: boolean, node: Node, isElectroView: boolean) => void;
  onClickAddTerminal: (typeId: string, nodeId: string, direction: ConnectorDirection) => void;
  onClickRemoveTerminal: (nodeId: string, terminalId: string) => void;
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
  onConnectorClick,
  onClickAddTerminal,
  onClickRemoveTerminal,
}: Props) => {
  const [showMenuButton, setShowMenuButton] = useState(false);
  const company = useAppSelector(commonStateCompanySelector);

  return (
    <NodeBox
      node={node}
      colorMain={colorMain}
      colorSelected={colorSelected}
      selected={node.selected}
      onMouseEnter={() => OnHover(setShowMenuButton)}
      onMouseLeave={() => OnMouseOut(setShowMenuButton)}
    >
      <BlockChildHeader
        node={node}
        isElectroView={isElectroView}
        inputConnectors={inputConnectors}
        outputConnectors={outputConnectors}
        onConnectorClick={(c, isInput, node, isElectroView) => onConnectorClick(c, isInput, node, isElectroView)}
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
