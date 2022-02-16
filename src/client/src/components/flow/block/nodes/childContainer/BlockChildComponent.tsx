import { GetCompanyLogoForNode, GetSelectedBlockNode } from "../../../../../helpers";
import { Connector, Node } from "../../../../../models";
import { OnHover, OnMouseOut } from "../handlers";
import { NodeBox } from "./styled";
import { LogoBox, SymbolBox } from "../../logo/styled";
import { Symbol } from "../../../../../compLibrary/symbol";
import { useState } from "react";
import { BlockChildHeader } from "./index";
import Config from "../../../../../models/Config";

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
const BlockChildComponent = ({ node, colorMain, colorSelected, inputTerminals, outputTerminals, onConnectorClick }: Props) => {
  const [showMenuButton, setShowMenuButton] = useState(false);
  const isSelected = node.id === GetSelectedBlockNode()?.id;

  return (
    <NodeBox
      node={node}
      colorMain={colorMain}
      colorSelected={colorSelected}
      isSelected={isSelected}
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

export default BlockChildComponent;
