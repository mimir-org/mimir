import * as selectors from "redux/store/selectors";
import { IsLocation } from "../../../../../../helpers/Aspects";
import { ParentBox, ResizeButton } from "./BlockParentComponent.styled";
import { Background, BackgroundVariant } from "react-flow-renderer";
import { Color } from "../../../../../../assets/color/Color";
import { BlockParentBanner } from "./BlockParentBanner";
import { ResizeIcon } from "../../../../../../assets/icons/resize";
import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/store";
import { Tooltip } from "../../../../../../compLibrary/tooltip/Tooltip";
import { TextResources } from "../../../../../../assets/text/TextResources";
import { useResizeParentNode } from "./hooks/useResizeParentNode";
import { useOnAddTerminal, useOnRemoveTerminal } from "../../../hooks";
import { useCompanySelector } from "../../../../../../hooks/useCompanySelector";
import { AspectObject, Connector, Direction } from "lib";

interface Props {
  node: AspectObject;
  inputConnectors: Connector[];
  outputConnectors: Connector[];
  isNavigationActive: boolean;
  isElectroView: boolean;
  onNavigateUpClick: () => void;
  onNavigateDownClick: () => void;
  onConnectorClick: (conn: Connector, isInput: boolean, node: AspectObject, isElectroView: boolean) => void;
}

/**
 * Component for the parent block node in BlockView.
 * @param interface
 * @returns a parent container with terminals menus and terminals.
 * The component serves as a container for the parent node's child nodes.
 */
export const BlockParentComponent = ({
  node,
  inputConnectors,
  outputConnectors,
  isNavigationActive,
  isElectroView,
  onNavigateUpClick,
  onNavigateDownClick,
  onConnectorClick,
}: Props) => {
  const dispatch = useAppDispatch();
  const isLocation = IsLocation(node);
  const resizePanelRef = useRef(null);
  const company = useCompanySelector(node.domain, node.id);
  useResizeParentNode(node, resizePanelRef, dispatch);
  const terminals = useAppSelector(selectors.terminalsSelector);
  const project = useAppSelector(selectors.projectSelector);
  const libNodes = useAppSelector(selectors.libNodesSelector);

  const OnClickAddTerminal = (typeId: string, nodeId: string, direction: Direction) => {
    return useOnAddTerminal(project, typeId, nodeId, terminals, libNodes, direction, dispatch);
  };

  const OnClickRemoveTerminal = (nodeId: string, terminalId: string) => {
    return useOnRemoveTerminal(project, nodeId, terminalId, dispatch);
  };

  return (
    <ParentBox id={`parent-block-${node.id}`} selected={node.blockSelected} width={500} height={500}>
      <BlockParentBanner
        node={node}
        company={company}
        isElectroView={isElectroView}
        inputConnectors={inputConnectors}
        outputConnectors={outputConnectors}
        isNavigationActive={isNavigationActive}
        onNavigateUpClick={() => onNavigateUpClick()}
        onNavigateDownClick={() => onNavigateDownClick()}
        onConnectorClick={(c, isInput, node, isElectroView) => onConnectorClick(c, isInput, node, isElectroView)}
        onClickAddTerminal={OnClickAddTerminal}
        onClickRemoveTerminal={OnClickRemoveTerminal}
        project={project}
      />
      <Tooltip content={TextResources.RESIZE_NODE} placement={"bottom"} offset={[0, 10]}>
        <ResizeButton ref={resizePanelRef} visible={true}>
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
