import { GetAspectColor, GetRdsPrefix } from "../../../../../../helpers";
import { AspectColorType } from "../../../../../../models";
import { HeaderContainer, HeaderGroup, HeaderTitle, LogoBox } from "./BlockParentBanner.styled";
import { TerminalsMenuComponent } from "../../../terminals/TerminalsMenuComponent";
import { Navigation } from "./Navigation";
import { Node, Connector } from "@mimirorg/modelbuilder-types";
import { MimirorgCompanyCm } from "@mimirorg/typelibrary-types";

interface Props {
  node: Node;
  company: MimirorgCompanyCm;
  inputConnectors: Connector[];
  outputConnectors: Connector[];
  isNavigationActive: boolean;
  onNavigateUpClick: () => void;
  onNavigateDownClick: () => void;
  onConnectorClick: (conn: Connector, isInput: boolean, node: Node, isElectroView: boolean, isOffPage: boolean) => void;
}

/**
 * Component for the top banner menu on a ParentNode in BlockView.
 * @returns a menu banner with terminal menus, logo, name and arrows for navigation.
 */
export const BlockParentBanner = ({
  node,
  company,
  inputConnectors,
  outputConnectors,
  isNavigationActive,
  onNavigateUpClick,
  onNavigateDownClick,
  onConnectorClick,
}: Props) => (
  <HeaderContainer color={GetAspectColor(node, AspectColorType.Header)}>
    <HeaderGroup gap={"10px"}>
      <TerminalsMenuComponent
        node={node}
        connectors={inputConnectors}
        onClick={(c, isInput, node, isElectroView, isOffPage) => onConnectorClick(c, isInput, node, isElectroView, isOffPage)}
        isInput
        isParent
      />
      {!node.isRoot && (
        <LogoBox>
          <img src={company.logo} alt={company.name} />
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
      connectors={outputConnectors}
      onClick={(c, isInput, node, isElectroView, isOffPage) => onConnectorClick(c, isInput, node, isElectroView, isOffPage)}
      isInput={false}
      isParent
    />
  </HeaderContainer>
);
