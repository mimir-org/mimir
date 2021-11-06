import { LogoBox, SymbolBox, TreeNodeNameBox } from "./styled";
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
    <>
      <TreeNodeNameBox>{node.label ?? node.name}</TreeNodeNameBox>
      <LogoBox>
        <img src={GetCompanyLogoForNode(company, node, false)} alt="logo" className="logo" />
      </LogoBox>
      <SymbolBox>
        <Symbol base64={node.symbol} text={node.name} />
      </SymbolBox>
    </>
  );
};

export default TreeLogoComponent;
