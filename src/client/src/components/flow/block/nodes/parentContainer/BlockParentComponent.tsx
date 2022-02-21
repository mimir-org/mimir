import { Connector, Node } from "../../../../../models";
import { ParentBox, ResizeButton } from "./styled";
import { IsLocation, IsProduct } from "../../../../../helpers";
import { Background, BackgroundVariant } from "react-flow-renderer";
import { Color } from "../../../../../compLibrary/colors";
import { ResizeIcon } from "../../../../../assets/icons/resize";
import { useRef } from "react";
import { useResizeParentNode } from "./hooks";
import { BlockParentBanner } from ".";
import { BlockNodeSize } from "../../../../../models/project";
import { useAppDispatch } from "../../../../../redux/store";

interface Props {
  node: Node;
  size: BlockNodeSize;
  inputTerminals: Connector[];
  outputTerminals: Connector[];
  isNavigationActive: boolean;
  explorerOpen: boolean;
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
const BlockParentComponent = ({
  node,
  size,
  inputTerminals,
  outputTerminals,
  isNavigationActive,
  explorerOpen,
  onNavigateUpClick,
  onNavigateDownClick,
  onConnectorClick,
}: Props) => {
  const dispatch = useAppDispatch();
  const resizePanelRef = useRef(null);
  useResizeParentNode(node.id, resizePanelRef, dispatch);
  const isLocation = IsLocation(node);

  return (
    <ParentBox id={"parent-block-" + node.id} selected={node.isBlockSelected} size={size} explorerOpen={explorerOpen}>
      <BlockParentBanner
        node={node}
        inputTerminals={inputTerminals}
        outputTerminals={outputTerminals}
        isNavigationActive={isNavigationActive}
        onNavigateUpClick={() => onNavigateUpClick()}
        onNavigateDownClick={() => onNavigateDownClick()}
        onConnectorClick={(c, isInput) => onConnectorClick(c, isInput)}
      />
      {IsProduct(node) && (
        <ResizeButton ref={resizePanelRef}>
          <img src={ResizeIcon} alt="resize" />
        </ResizeButton>
      )}
      <Background
        variant={isLocation ? BackgroundVariant.Lines : BackgroundVariant.Dots}
        color={isLocation ? Color.Grey : Color.BlueDark}
        gap={isLocation ? 20 : 15}
        style={{ zIndex: 0 }}
      />
    </ParentBox>
  );
};

export default BlockParentComponent;
