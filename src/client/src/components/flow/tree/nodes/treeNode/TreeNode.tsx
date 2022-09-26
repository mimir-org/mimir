/* eslint-disable react-hooks/exhaustive-deps */
import { FC, memo, useCallback, useEffect, useState } from "react";
import { NodeProps } from "react-flow-renderer";
import { AspectColorType } from "../../../../../models";
import { Node, Connector } from "@mimirorg/modelbuilder-types";
import { TreeNodeBox } from "./TreeNode.styled";
import { TreeLogoComponent } from "./components/TreeLogoComponent";
import { GetAspectColor } from "../../../../../helpers";
import { TreeNodeTerminal } from "./components/TreeNodeTerminal";
import { useAppDispatch } from "../../../../../redux/store";
import { FilterTreeTerminals } from "./helpers/FilterTreeTerminals";

/**
 * Component to display a node in TreeView.
 * @param data the data for the node.
 * @returns a Mimir Node in the FlowTree context.
 */
const TreeNode: FC<NodeProps<Node>> = ({ data }) => {
  const dispatch = useAppDispatch();
  const [isHover, setIsHover] = useState(false);
  const [timer, setTimer] = useState(false);
  const [terminals, setTerminals] = useState([] as Connector[]);
  const [renderTerminals, setRenderTerminals] = useState(true);

  useEffect(() => {
    setTerminals(FilterTreeTerminals(data?.connectors));
  }, []);

  useEffect(() => {
    if (timer) {
      const clock = window.setInterval(() => {
        setTimer(false);
        setIsHover(false);
      }, 5000);
      return () => window.clearInterval(clock);
    }
  }, [timer]);

  const GetTerminal = useCallback(
    (connector: Connector) => {
      return (
        <TreeNodeTerminal
          key={`handle-${connector.id}`}
          node={data}
          connector={connector}
          isHover={isHover}
          setIsHover={setIsHover}
          dispatch={dispatch}
        />
      );
    },
    [isHover]
  );

  if (!data) return null;

  const mouseUp = () => setRenderTerminals(true);
  const mouseDown = () => setRenderTerminals(false);
  const mouseEnter = () => setIsHover(true);
  const mouseLeave = () => {
    setTimer(true);
    setIsHover(false);
  };

  return (
    <TreeNodeBox
      colorMain={GetAspectColor(data, AspectColorType.Main)}
      colorSelected={GetAspectColor(data, AspectColorType.Selected)}
      selected={data.selected}
      visible={!data.hidden}
      onMouseEnter={() => mouseEnter()}
      onMouseLeave={() => mouseLeave()}
      onMouseUp={() => mouseUp()}
      onMouseDown={() => mouseDown()}
    >
      {renderTerminals &&
        terminals.map((connector) => {
          return GetTerminal(connector);
        })}
      <TreeLogoComponent node={data} />
    </TreeNodeBox>
  );
};

export default memo(TreeNode);
