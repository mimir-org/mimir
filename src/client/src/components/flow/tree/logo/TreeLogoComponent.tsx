import { LogoBox, SymbolBox, TreeLogoWrapper, TreeNodeNameBox } from "./styled";
import { Node } from "../../../../models";
import { Symbol } from "../../../../compLibrary/symbol";
import { GetCompanyLogoForNode } from "../../../../helpers";
import Config from "../../../../models/Config";

interface Props {
  node: Node;
}

/**
 * Component to show name, symbol and logo for a TreeNode.
 * @param interface
 * @returns name,logo and symbol.
 */
const TreeLogoComponent = ({ node }: Props) => {
  const company = Config.COMPANY;

  return (
    <TreeLogoWrapper>
      <TreeNodeNameBox>{node.label ?? node.name}</TreeNodeNameBox>
      <SymbolBox>
        <Symbol base64={node.symbol} text={node.name} />
      </SymbolBox>
      <LogoBox>
        <img src={GetCompanyLogoForNode(company, node)} alt="logo" />
      </LogoBox>
    </TreeLogoWrapper>
  );
};

export default TreeLogoComponent;
