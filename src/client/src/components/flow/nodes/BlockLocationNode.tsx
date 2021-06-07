import { memo, FC, useState, useEffect } from "react";
import { NodeProps } from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import { OptionsIcon } from "../../../assets/icons/blockView";
import { addSelectedConnector } from "../../../redux/store/flow/actions";
import red, { RootState } from "../../../redux/store";
import { Node, TERMINAL } from "../../../models/project";
import { HandleComponent } from "../block";
import {
  GetConnectors,
  SetConnectors,
} from "../../../redux/store/localStorage";
import {
  GetConnectorIcon,
  SortLocationConnectors,
  GetConnectorName,
  IsLocationNode,
} from "../helpers/common";
import {
  NodeBox,
  OptionsBox,
  OptionsElement,
  OptionsMenu,
} from "../../../componentLibrary/blockView";

const BlockLocationNode: FC<NodeProps> = ({ data }) => {
  const dispatch = useDispatch();
  const [showButton, setShowButton] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const connectors = GetConnectors();
  const splitView = red.store.getState().splitView;
  const isSplitView = splitView.visible as boolean;
  const splitViewNode = splitView.node as Node;
  const selectedNode = useSelector<RootState>((state) =>
    state.projectState.project?.nodes?.find((x) => x.isBlockSelected)
  ) as Node;

  const isLocation = isSplitView
    ? IsLocationNode(splitViewNode)
    : IsLocationNode(selectedNode);

  const handleClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleOnHover = () => {
    setShowButton(true);
  };

  const handleOnMouseOut = () => {
    setShowButton(false);
  };

  const handleConnectorClick = (connector) => {
    dispatch(addSelectedConnector(connector));
    connectors.push(connector);
    setMenuOpen(false);
    SetConnectors(connectors);
  };

  useEffect(() => {
    const locationNode = document.querySelector(
      `[data-id="${data.id}"]`
    ) as HTMLElement;

    if (locationNode) {
      locationNode.style.width = `${data.width}px`;
      locationNode.style.height = `${data.length}px`;
    }
  }, [data, data.id]);
  return (
    <NodeBox
      location
      onMouseOver={handleOnHover}
      onMouseOut={handleOnMouseOut}
      width={data.width}
      length={data.length}
    >
      <OptionsMenu visible={showButton} onClick={handleClick}>
        <img src={OptionsIcon} alt="options" />
      </OptionsMenu>
      <p className="node-name">{data.label ?? data.name}</p>
      <OptionsBox visible={menuOpen} width={data.width} type={TERMINAL}>
        {SortLocationConnectors(data.connectors).map((conn) => (
          <OptionsElement
            key={conn.id}
            onClick={() => handleConnectorClick(conn)}
          >
            {GetConnectorName(conn)}
            <img
              src={GetConnectorIcon(conn.terminal)}
              alt="icon"
              className="button"
            />
          </OptionsElement>
        ))}
      </OptionsBox>

      <HandleComponent
        data={data}
        list={connectors}
        isLocation={isLocation}
        type="block"
      ></HandleComponent>

      <HandleComponent
        data={data}
        list={data.connectors}
        isLocation={isLocation}
      ></HandleComponent>
    </NodeBox>
  );
};

export default memo(BlockLocationNode);
