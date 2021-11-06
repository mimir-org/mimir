import { LogoBox, SymbolBox, BlockNodeNameBox } from "./styled";
import { Node } from "../../../../models";
import { Symbol } from "../../../../compLibrary/symbol";
import { GetCompanyLogo } from "../../../../helpers";

interface Props {
  node: Node;
  parent: boolean;
}

/**
 * Component to show name, symbol and logo for a BlockNode.
 * @param interface
 * @returns name,logo and symbol.
 */
const BlockLogoComponent = ({ node, parent }: Props) => {
  const company = process.env.REACT_APP_COMPANY;

  return (
    <>
      <BlockNodeNameBox>{node.label ?? node.name}</BlockNodeNameBox>
      <LogoBox>
        <img src={GetCompanyLogo(company, node, parent)} alt="logo" className="logo" />
      </LogoBox>
      <SymbolBox>
        <Symbol base64={node.symbol} text={node.name} />
      </SymbolBox>
    </>
  );
};

export default BlockLogoComponent;
