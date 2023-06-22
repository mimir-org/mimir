import { LogoBox, SymbolBox, TreeLogoWrapper, TreeNodeNameBox } from "./TreeNode.styled";
import { Symbol } from "../../../../../compLibrary/symbol";
import { Tooltip } from "../../../../../compLibrary/tooltip/Tooltip";
import { useIsOverflowing } from "../../../../../hooks/useIsOverflowing";
import { useCompanySelector } from "../../../../../hooks/useCompanySelector";
import { AspectObject } from "lib";

interface Props {
  node: AspectObject;
}

/**
 * Component to show name, symbol and logo for a TreeNode.
 * @param interface
 * @returns name, logo and symbol.
 */
export const TreeLogoComponent = ({ node }: Props) => {
  const { overflowRef, isOverflowing } = useIsOverflowing<HTMLParagraphElement>();
  const company = useCompanySelector(node.domain, node.id);
  const name = node.label ?? node.name;

  return (
    <TreeLogoWrapper>
      <Tooltip content={name} disabled={!isOverflowing} offset={[0, 10]}>
        <TreeNodeNameBox tabIndex={isOverflowing ? 0 : undefined} ref={overflowRef}>
          {name}
        </TreeNodeNameBox>
      </Tooltip>
      <SymbolBox>
        <Symbol source={node.symbol} text={node.name} />
      </SymbolBox>
      {company && (
        <LogoBox>
          <img src={company.logo} alt={company.name} />
        </LogoBox>
      )}
    </TreeLogoWrapper>
  );
};
