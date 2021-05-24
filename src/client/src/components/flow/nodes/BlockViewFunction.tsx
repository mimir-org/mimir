import { memo, FC, useState, useEffect } from "react";
import { NodeProps, Handle } from "react-flow-renderer";
import { useDispatch } from "react-redux";
import { OptionsIcon } from "../../../assets/icons/blockView";
import { addSelectedConnector } from "../../../redux/store/flow/actions";
import { SetConnectorPosition, GetBlockHandleType } from "../helpers/block";
import {
  GetConnectors,
  SetConnectors,
} from "../../../redux/store/localStorage";
import {
  GetConnectorIcon,
  GetHandlePosition,
  SortConnectors,
  GetConnectorName,
} from "../helpers";
import {
  NodeBox,
  OptionsBox,
  OptionsElement,
  OptionsMenu,
  HandleBox,
} from "../../../componentLibrary/blockView";

const BlockViewFunction: FC<NodeProps> = ({ data }) => {
  const dispatch = useDispatch();
  const [showButton, setShowButton] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleOnHover = () => {
    if (!menuOpen) {
      setShowButton(!showButton);
    }
  };

  const handleOnMouseOut = () => {
    if (!menuOpen) {
      setShowButton(false);
    }
  };

  const handleConnectorClick = (connector) => {
    dispatch(addSelectedConnector(connector));
    connectors.push(connector);
    setMenuOpen(false);
    SetConnectors(connectors);
  };

  const connectors = GetConnectors();
  const sortedConns = [];

  // TODO: fix this hack
  //   useEffect(() => {
  //     setShowButton(false);
  //   }, []);

  return (
    <NodeBox onMouseOver={handleOnHover} onMouseOut={handleOnMouseOut}>
      <OptionsMenu visible={showButton} onClick={handleClick}>
        <img src={OptionsIcon} alt="options" />
      </OptionsMenu>
      <OptionsBox visible={menuOpen}>
        {SortConnectors(data.connectors).map((conn) => (
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
      <div>{data.label ?? data.names}</div>

      {connectors?.map((conn) => {
        const [type, pos, className] = GetBlockHandleType(conn);
        if (data.id === conn.nodeId) {
          sortedConns.push(conn);
          return (
            <HandleBox
              id={"handle-" + conn.id}
              index={SetConnectorPosition(sortedConns)}
              position={GetHandlePosition(pos)}
              key={conn.id}
            >
              <Handle
                type={type}
                position={pos}
                id={conn.id}
                key={conn.id}
                className={className}
              />
              <img
                src={GetConnectorIcon(conn.terminal)}
                alt="icon"
                className="connector"
              />
            </HandleBox>
          );
        }
        return null;
      })}
    </NodeBox>
  );
};

export default memo(BlockViewFunction);
