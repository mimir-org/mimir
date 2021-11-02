import { LogoBox, SymbolBox, BlockNodeNameBox } from "./styled";
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
const BlockLogoComponent = ({ node }: Props) => {
  const company = process.env.REACT_APP_COMPANY;

  return (
    <>
      <BlockNodeNameBox>{node.label ?? node.name}</BlockNodeNameBox>
      <LogoBox>
        <img src={GetCompanyLogo(company, node)} alt="logo" className="logo" />
      </LogoBox>
      <SymbolBox>
        <Symbol base64={node.symbol} text={node.name} />{" "}
      </SymbolBox>
    </>
  );
};

export default BlockLogoComponent;
