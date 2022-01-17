import { GetAspectColor, GetCompanyLogoForNode, GetRdsPrefix } from "../../../../../helpers";
import { AspectColorType, Connector, Node } from "../../../../../models";
import { HeaderContainer, HeaderGroup, HeaderTitle, LogoBox } from "./styled";
import { TerminalsMenuComponent } from "../../terminals";
import Navigation from "../navigation/Navigation";

interface Props {
  node: Node;
  inputTerminals: Connector[];
  outputTerminals: Connector[];
  isNavigationActive: boolean;
  onNavigateUpClick: () => void;
  onNavigateDownClick: () => void;
  onConnectorClick: (conn: Connector) => void;
}

/**
 * Component for the top banner menu on a ParentNode in BlockView.
 * @returns a menu banner with terminal menus, logo, name and arrows for navigation.
 */
const BlockParentBanner = ({
  node,
  inputTerminals,
  outputTerminals,
  isNavigationActive,
  onNavigateUpClick,
  onNavigateDownClick,
  onConnectorClick
}: Props) => {
  const prefix = GetRdsPrefix(node);
  const company = process.env.REACT_APP_COMPANY;

  return (
    <HeaderContainer color={GetAspectColor(node, AspectColorType.Header)}>
      <HeaderGroup gap={"10px"}>
        <TerminalsMenuComponent
          node={node}
          terminals={inputTerminals}
          onClick={(c) => onConnectorClick(c)}
          isInput={true}
          isParent
        />
        {!node.isRoot && (
          <LogoBox>
            <img src={GetCompanyLogoForNode(company, node)} alt="logo" />
          </LogoBox>
        )}
      </HeaderGroup>
      <HeaderGroup gap={"5px"}>
        <HeaderTitle>{prefix}{node.label ?? node.name}</HeaderTitle>
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
        onClick={(c) => onConnectorClick(c)}
        isInput={false}
        isParent
      />
    </HeaderContainer>
  );
};

export default BlockParentBanner;
