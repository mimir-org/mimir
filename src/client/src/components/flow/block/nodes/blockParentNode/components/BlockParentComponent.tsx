import { IsLocation } from "../../../../../../helpers/Aspects";
import { ParentBox, ResizeButton } from "./BlockParentComponent.styled";
import { Background, BackgroundVariant } from "react-flow-renderer";
import { Color } from "../../../../../../assets/color/Color";
import { BlockParentBanner } from "./BlockParentBanner";
import { ResizeIcon } from "../../../../../../assets/icons/resize";
import { useRef } from "react";
import { commonStateCompanySelector, useAppDispatch, useAppSelector } from "../../../../../../redux/store";
import { Tooltip } from "../../../../../../compLibrary/tooltip/Tooltip";
import { TextResources } from "../../../../../../assets/text/TextResources";
import { useResizeParentNode } from "./hooks/useResizeParentNode";
import { Connector, Node } from "@mimirorg/modelbuilder-types";

interface Props {
  node: Node;
  splitView: boolean;
  inputConnectors: Connector[];
  outputConnectors: Connector[];
  isNavigationActive: boolean;
  onNavigateUpClick: () => void;
  onNavigateDownClick: () => void;
  onConnectorClick: (conn: Connector, isInput: boolean, node: Node, isElectroView: boolean, isOffPage: boolean) => void;
}

/**
 * Component for the parent block node in BlockView.
 * @param interface
 * @returns a parent container with terminals menus and terminals.
 * The component serves as a container for the parent node's child nodes.
 */
export const BlockParentComponent = ({
  node,
  splitView,
  inputConnectors,
  outputConnectors,
  isNavigationActive,
  onNavigateUpClick,
  onNavigateDownClick,
  onConnectorClick,
}: Props) => {
  const dispatch = useAppDispatch();
  const isLocation = IsLocation(node);
  const resizePanelRef = useRef(null);
  const company = useAppSelector(commonStateCompanySelector);
  useResizeParentNode(node, resizePanelRef, dispatch);

  return (
    <ParentBox id={`parent-block-${node.id}`} selected={node.blockSelected} width={node.width} height={node.height}>
      <BlockParentBanner
        node={node}
        company={company}
        inputConnectors={inputConnectors}
        outputConnectors={outputConnectors}
        isNavigationActive={isNavigationActive}
        onNavigateUpClick={() => onNavigateUpClick()}
        onNavigateDownClick={() => onNavigateDownClick()}
        onConnectorClick={(c, isInput, node, isElectroView, isOffPage) =>
          onConnectorClick(c, isInput, node, isElectroView, isOffPage)
        }
      />
      <Tooltip content={TextResources.RESIZE_NODE} placement={"bottom"} offset={[0, 10]}>
        <ResizeButton ref={resizePanelRef} visible={!splitView}>
          <img src={ResizeIcon} alt="resize" />
        </ResizeButton>
      </Tooltip>
      <Background
        variant={isLocation ? BackgroundVariant.Lines : BackgroundVariant.Dots}
        color={isLocation ? Color.GAINSBORO : Color.MIDNIGHT_EXPRESS}
        gap={isLocation ? 20 : 15}
        style={{ zIndex: 0 }}
      />
    </ParentBox>
  );
};
