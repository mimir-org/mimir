import { GetCompanyLogoForNode } from "../../../../../../helpers";
import { Connector, Node } from "../../../../../../models";
import { OnHover, OnMouseOut } from "./handlers";
import { NodeBox, SymbolBox, LogoBox } from "./BlockChildComponent.styled";
import { Symbol } from "../../../../../../compLibrary/symbol";
import { useState } from "react";
import { BlockChildHeader } from "./BlockChildHeader";
import { GetSelectedBlockNode } from "../../../../../../helpers/Selected";
import Config from "../../../../../../models/Config";

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
  const selected = node.id === GetSelectedBlockNode()?.id;

  return (
    <NodeBox
      node={node}
      colorMain={colorMain}
      colorSelected={colorSelected}
      selected={selected}
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
        <Symbol base64={node.symbol} text={node.name} />
      </SymbolBox>
      <LogoBox>
        <img src={GetCompanyLogoForNode(Config.COMPANY, node)} alt="logo" />
      </LogoBox>
    </NodeBox>
  );
};
