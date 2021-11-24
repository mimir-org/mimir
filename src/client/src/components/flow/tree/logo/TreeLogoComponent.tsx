import { LogoBox, SymbolBox, TreeLogoWrapper, TreeNodeNameBox } from "./styled";
import { Node } from "../../../../models";
import { Symbol } from "../../../../compLibrary/symbol";
import { GetCompanyLogoForNode } from "../../../../helpers";

interface Props {
  node: Node;
}

/**
 * Component to show name, symbol and logo for a TreeNode.
 * @param interface
 * @returns name,logo and symbol.
 */
const TreeLogoComponent = ({ node }: Props) => {
  const company = process.env.REACT_APP_COMPANY;

  return (
    <TreeLogoWrapper>
      <TreeNodeNameBox>{node.label ?? node.name}</TreeNodeNameBox>
      <LogoBox>
        <img src={GetCompanyLogoForNode(company, node, false)} alt="logo" />
      </LogoBox>
      <SymbolBox>
        <Symbol base64={node.symbol} text={node.name} />
      </SymbolBox>
    </TreeLogoWrapper>
  );
};

export default TreeLogoComponent;