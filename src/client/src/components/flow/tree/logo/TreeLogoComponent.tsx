import { LogoBox, SymbolBox, TreeNodeNameBox } from "./styled";
import { Node } from "../../../../models";
import { GetCompanyLogo } from "../../helpers";
import { Symbol } from "../../../../compLibrary/symbol";

interface Props {
  node: Node;
}

/**
 * Component to show name, symbol and logo for a BlockNode.
 * @param interface
 * @returns name,logo and symbol.
 */
const TreeLogoComponent = ({ node }: Props) => {
  const company = process.env.REACT_APP_COMPANY;

  return (
    <>
      <TreeNodeNameBox>{node.label ?? node.name}</TreeNodeNameBox>
      <LogoBox>
        <img src={GetCompanyLogo(company, node)} alt="logo" className="logo" />
      </LogoBox>
      <SymbolBox>
        <Symbol base64={node.symbol} text={node.name} />{" "}
      </SymbolBox>
    </>
  );
};

export default TreeLogoComponent;
