import { Connector, Node } from "../../../../../../models";
import { IsLocation } from "../../../../../../helpers/Aspects";
import { ParentBox, ResizeButton } from "./BlockParentComponent.styled";
import { Background, BackgroundVariant } from "react-flow-renderer";
import { Color } from "../../../../../../compLibrary/colors/Color";
import { BlockParentBanner } from "./BlockParentBanner";
import { ResizeIcon } from "../../../../../../assets/icons/resize";
import { useRef } from "react";
import { useAppDispatch } from "../../../../../../redux/store";
import { Tooltip } from "../../../../../../compLibrary/tooltip/Tooltip";
import { TextResources } from "../../../../../../assets/text/TextResources";
import { useResizeParentNode } from "./hooks/useResizeParentNode";

interface Props {
  node: Node;
  splitView: boolean;
  inputTerminals: Connector[];
  outputTerminals: Connector[];
  isNavigationActive: boolean;
  onNavigateUpClick: () => void;
  onNavigateDownClick: () => void;
  onConnectorClick: (conn: Connector, isInput: boolean) => void;
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
  inputTerminals,
  outputTerminals,
  isNavigationActive,
  onNavigateUpClick,
  onNavigateDownClick,
  onConnectorClick,
}: Props) => {
  const dispatch = useAppDispatch();
  const isLocation = IsLocation(node);
  const resizePanelRef = useRef(null);
  // useResizeParentNode(node, resizePanelRef, dispatch);

  return (
    <ParentBox id={"parent-block-" + node.id} selected={node.isBlockSelected} width={node.width} height={node.height}>
      <BlockParentBanner
        node={node}
        inputTerminals={inputTerminals}
        outputTerminals={outputTerminals}
        isNavigationActive={isNavigationActive}
        onNavigateUpClick={() => onNavigateUpClick()}
        onNavigateDownClick={() => onNavigateDownClick()}
        onConnectorClick={(c, isInput) => onConnectorClick(c, isInput)}
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
