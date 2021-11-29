import { ArrowDown, ArrowUp } from "../../../../../assets/icons/arrow";
import { GetCompanyLogoForNode, IsAspectNode } from "../../../../../helpers";
import { Node } from "../../../../../models";
import { Banner, Header, LogoBox, Navigation } from "./styled";

interface Props {
  node: Node;
  color: string;
  hasChildren: boolean;
  company: string;
  prefix: string;
  onParentClick: () => void;
  onChildClick: () => void;
}

/**
 * Component for the top banner menu on a ParentNode in BlockView.
 * @param interface
 * @returns a menu banner with logo, name and arrows for navigation.
 */
const ParentBannerComponent = ({ node, color, hasChildren, company, prefix, onParentClick, onChildClick }: Props) => (
  <Banner id={"parent-banner-" + node.id} color={color}>
    <Header id={"node-name-" + node.id}>
      {prefix}
      {node.label ?? node.name}
    </Header>
    <Navigation id="navigate-up" onClick={() => onParentClick()}>
      {!IsAspectNode(node) && <img src={ArrowUp} alt="navigate-up" className="img" />}
    </Navigation>
    <Navigation id="navigate-down" onClick={() => onChildClick()}>
      <img src={ArrowDown} alt="navigate-down" className="img" />
    </Navigation>
    {!node.isRoot && (
      <LogoBox hasChildren={hasChildren}>
        <img src={GetCompanyLogoForNode(company, node)} alt="logo" />
      </LogoBox>
    )}
  </Banner>
);

export default ParentBannerComponent;
