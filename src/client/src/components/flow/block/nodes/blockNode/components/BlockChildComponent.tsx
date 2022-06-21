import { OnHover, OnMouseOut } from "./handlers";
import { NodeBox, SymbolBox, LogoBox } from "./BlockChildComponent.styled";
import { Symbol } from "../../../../../../compLibrary/symbol";
import { useState } from "react";
import { BlockChildHeader } from "./BlockChildHeader";
import { Node, Connector } from "@mimirorg/modelbuilder-types";
import { commonStateCompanySelector, useAppSelector } from "../../../../../../redux/store";

interface Props {
  node: Node;
  colorMain: string;
  colorSelected: string;
  inputTerminals: Connector[];
  outputTerminals: Connector[];
  onConnectorClick: (conn: Connector, isInput: boolean) => void;
}

/**
 * Component for the child block node in BlockView.
 * @returns a child container with terminals menus and terminals.
 */
export const BlockChildComponent = ({
  node,
  colorMain,
  colorSelected,
  inputTerminals,
  outputTerminals,
  onConnectorClick,
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
        inputTerminals={inputTerminals}
        outputTerminals={outputTerminals}
        onConnectorClick={(c, isInput) => onConnectorClick(c, isInput)}
        showMenuButton={showMenuButton}
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
