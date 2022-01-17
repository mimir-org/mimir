import { GetCompanyLogoForNode, GetSelectedBlockNode } from "../../../../../helpers";
import { Connector, Node } from "../../../../../models";
import { OnHover, OnMouseOut } from "../handlers";
import { NodeBox } from "./styled";
import { LogoBox, SymbolBox } from "../../logo/styled";
import { Symbol } from "../../../../../compLibrary/symbol";
import { useState } from "react";
import { BlockChildHeader } from "./index";

interface Props {
  node: Node;
  colorMain: string;
  colorSelected: string;
  inputTerminals: Connector[];
  outputTerminals: Connector[];
  onConnectorClick: (conn: Connector) => void;
}

/**
 * Component for the child block node in BlockView.
 * @returns a child container with terminals menus and terminals.
 */
const BlockChildComponent = ({
  node,
  colorMain,
  colorSelected,
  inputTerminals,
  outputTerminals,
  onConnectorClick
}: Props) => {
  const [showMenuButton, setShowMenuButton] = useState(false);

  return (
    <NodeBox
      node={node}
      colorMain={colorMain}
      colorSelected={colorSelected}
      isSelected={node === GetSelectedBlockNode()}
      onMouseEnter={() => OnHover(setShowMenuButton)}
      onMouseLeave={() => OnMouseOut(setShowMenuButton)}
    >
      <BlockChildHeader
        node={node}
        inputTerminals={inputTerminals}
        outputTerminals={outputTerminals}
        onConnectorClick={(c) => onConnectorClick(c)}
        showMenuButton={showMenuButton}
      />
      <SymbolBox>
        <Symbol base64={node.symbol} text={node.name} />
      </SymbolBox>
      <LogoBox>
        <img src={GetCompanyLogoForNode(process.env.REACT_APP_COMPANY, node)} alt="logo" />
      </LogoBox>
    </NodeBox>
  );
};

export default BlockChildComponent;