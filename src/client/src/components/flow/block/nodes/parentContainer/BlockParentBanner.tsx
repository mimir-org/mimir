import { GetCompanyLogoForNode, GetRdsPrefix, IsAspectNode } from "../../../../../helpers";
import { Node } from "../../../../../models";
import { Banner, Header, LogoBox, Navigation } from "./styled";
import { ArrowDownIcon, ArrowDownInactiveIcon, ArrowUpIcon, ArrowUpInactiveIcon } from "../../../../../assets/icons/arrow";
import { HasChildren } from "../../../helpers";

interface Props {
  node: Node;
  color: string;
  hasTerminals: boolean;
  isSecondaryNode: boolean;
  onParentClick: () => void;
  onChildClick: () => void;
}

/**
 * Component for the top banner menu on a ParentNode in BlockView.
 * @param interface
 * @returns a menu banner with logo, name and arrows for navigation.
 */
const BlockParentBanner = ({ node, color, hasTerminals, isSecondaryNode, onParentClick, onChildClick }: Props) => {
  const showArrowDown = HasChildren(node);
  const showArrowUp = !IsAspectNode(node);
  const prefix = GetRdsPrefix(node);
  const company = process.env.REACT_APP_COMPANY;

  return (
    <Banner id={"parent-banner-" + node.id} color={color}>
      <Header id={"node-name-" + node.id}>
        {prefix}
        {node.label ?? node.name}
      </Header>
      {!isSecondaryNode && (
        <>
          <Navigation isActive={showArrowUp} onClick={showArrowUp ? onParentClick : null}>
            <img src={showArrowUp ? ArrowUpIcon : ArrowUpInactiveIcon} alt="navigate-up" className="img" />
          </Navigation>
          <Navigation isActive={showArrowDown} onClick={showArrowDown ? onChildClick : null}>
            <img src={showArrowDown ? ArrowDownIcon : ArrowDownInactiveIcon} alt="navigate-down" className="img" />
          </Navigation>
        </>
      )}
      {!node.isRoot && (
        <LogoBox hasTerminals={hasTerminals}>
          <img src={GetCompanyLogoForNode(company, node)} alt="logo" />
        </LogoBox>
      )}
    </Banner>
  );
};

export default BlockParentBanner;
