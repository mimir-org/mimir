import { LogoBox, SymbolBox, TreeLogoWrapper, TreeNodeNameBox } from "./TreeLogoComponent.styled";
import { Node } from "../../../../../../models";
import { Symbol } from "../../../../../../compLibrary/symbol";
import { GetCompanyLogoForNode } from "../../../../../../helpers/GetCompanyLogo";
import { Tooltip } from "../../../../../../compLibrary/tooltip/Tooltip";
import { useIsOverflowing } from "../../../../../../hooks/useIsOverflowing";
import Config from "../../../../../../models/Config";

interface Props {
  node: Node;
}

/**
 * Component to show name, symbol and logo for a TreeNode.
 * @param interface
 * @returns name, logo and symbol.
 */
export const TreeLogoComponent = ({ node }: Props) => {
  const { overflowRef, isOverflowing } = useIsOverflowing<HTMLParagraphElement>();
  const name = node.label ?? node.name;

  return (
    <TreeLogoWrapper>
      <Tooltip content={name} disabled={!isOverflowing} offset={[0, 10]}>
        <TreeNodeNameBox tabIndex={isOverflowing ? 0 : undefined} ref={overflowRef}>
          {name}
        </TreeNodeNameBox>
      </Tooltip>
      <SymbolBox>
        <Symbol base64={node.symbol} text={node.name} />
      </SymbolBox>
      <LogoBox>
        <img src={GetCompanyLogoForNode(Config.COMPANY, node)} alt="logo" />
      </LogoBox>
    </TreeLogoWrapper>
  );
};
