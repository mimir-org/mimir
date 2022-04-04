import { GetAspectColor, GetCompanyLogoForNode, GetRdsPrefix } from "../../../../../../helpers";
import { AspectColorType, Connector, Node } from "../../../../../../models";
import { HeaderContainer, HeaderGroup, HeaderTitle, LogoBox } from "./BlockParentBanner.styled";
import { TerminalsMenuComponent } from "../../../terminals/TerminalsMenuComponent";
import { Navigation } from "./Navigation";
import Config from "../../../../../../models/Config";

interface Props {
  node: Node;
  inputTerminals: Connector[];
  outputTerminals: Connector[];
  isNavigationActive: boolean;
  onNavigateUpClick: () => void;
  onNavigateDownClick: () => void;
  onConnectorClick: (conn: Connector, isInput: boolean) => void;
}

/**
 * Component for the top banner menu on a ParentNode in BlockView.
 * @returns a menu banner with terminal menus, logo, name and arrows for navigation.
 */
export const BlockParentBanner = ({
  node,
  inputTerminals,
  outputTerminals,
  isNavigationActive,
  onNavigateUpClick,
  onNavigateDownClick,
  onConnectorClick,
}: Props) => (
  <HeaderContainer color={GetAspectColor(node, AspectColorType.Header)}>
    <HeaderGroup gap={"10px"}>
      <TerminalsMenuComponent
        node={node}
        terminals={inputTerminals}
        onClick={(c, isInput) => onConnectorClick(c, isInput)}
        isInput
        isParent
      />
      {!node.isRoot && (
        <LogoBox>
          <img src={GetCompanyLogoForNode(Config.COMPANY, node)} alt="logo" />
        </LogoBox>
      )}
    </HeaderGroup>
    <HeaderGroup gap={"5px"}>
      <HeaderTitle>
        {GetRdsPrefix(node)}
        {node.label ?? node.name}
      </HeaderTitle>
      <Navigation
        isActive={isNavigationActive}
        node={node}
        onNavigateUpClick={() => onNavigateUpClick()}
        onNavigateDownClick={() => onNavigateDownClick()}
      />
    </HeaderGroup>
    <TerminalsMenuComponent
      node={node}
      terminals={outputTerminals}
      onClick={(c, isInput) => onConnectorClick(c, isInput)}
      isParent
    />
  </HeaderContainer>
);
