import { memo } from "react";
import { LogoBox, SymbolBox, BlockNodeNameBox, BlockLogoWrapper } from "./styled";
import { Node } from "../../../../models";
import { Symbol } from "../../../../compLibrary/symbol";
import { GetCompanyLogoForNode } from "../../../../helpers";

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
    <BlockLogoWrapper>
      <BlockNodeNameBox>{node.label ?? node.name}</BlockNodeNameBox>
      <SymbolBox>
        <Symbol base64={node.symbol} text={node.name} />
      </SymbolBox>
      <LogoBox>
        <img src={GetCompanyLogoForNode(company, node)} alt="logo" />
      </LogoBox>
    </BlockLogoWrapper>
  );
};

export default memo(BlockLogoComponent);
