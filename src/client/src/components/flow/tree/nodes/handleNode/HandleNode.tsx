/* eslint-disable react-hooks/exhaustive-deps */
import { FC, memo, useEffect, useState } from "react";
import { NodeProps } from "react-flow-renderer";
import { AspectColorType } from "../../../../../models";
import { Node, Connector } from "@mimirorg/modelbuilder-types";
import { HandleNodeBox } from "./HandleNode.styled";
import { GetAspectColor } from "../../../../../helpers";
import { HandleNodeTerminal } from "./components/HandleNodeTerminal";

/**
 * Component to display a node in TreeView.
 * @param data the data for the node.
 * @returns a Mimir Node in the FlowTree context.
 */
const HandleNode: FC<NodeProps<Node>> = ({ data }) => {
  const [terminals, setTerminals] = useState([] as Connector[]);

  useEffect(() => {
    setTerminals(data?.connectors);
  }, []);

  if (!data) return null;

  return (
    <HandleNodeBox
      colorMain={GetAspectColor(data, AspectColorType.Main)}
      colorSelected={GetAspectColor(data, AspectColorType.Selected)}
      selected={data.selected}
      visible={!data.hidden}
    >
      {terminals.map((connector) => {
        return <HandleNodeTerminal key={`handle-${connector.id}`} connector={connector} />;
      })}
    </HandleNodeBox>
  );
};

export default memo(HandleNode);
