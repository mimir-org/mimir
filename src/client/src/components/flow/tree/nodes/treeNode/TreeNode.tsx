import { memo, FC, useState, useEffect } from "react";
import { NodeProps, Handle } from "react-flow-renderer";
import { Connector, Node } from "../../../../../models";
import { Symbol } from "../../../../../compLibrary/symbol";
import { TreeNodeWrapper, TreeHandleBox, TreeNodeNameBox, LogoBox, SymbolBox } from "./styled";
import { GetHandleType, IsPartOf } from "../../../helpers";
import { FindAllNodes } from "../../../block/helpers";
import { AibelLogo } from "../../../../../assets/icons/aibel";
import { EquinorLogo } from "../../../../../assets/icons/equinor";

/**
 * Component to display a node in TreeView.
 * @param data the data for the node.
 * @returns a node in the FlowTree context.
 */
const TreeNode: FC<NodeProps<Node>> = ({ data }) => {
  const [isHover, setIsHover] = useState(false);
  const [timer, setTimer] = useState(false);

  useEffect(() => {
    if (timer) {
      const clock = window.setInterval(() => {
        setTimer(false);
        setIsHover(false);
      }, 5000);
      return () => {
        window.clearInterval(clock);
      };
    }
  }, [timer]);

  // Force correct z-index
  useEffect(() => {
    const allNodes = FindAllNodes();
    allNodes.style.zIndex = "5";
  }, []);

  const mouseNodeLeave = () => setTimer(true);

  return (
    <TreeNodeWrapper onMouseEnter={() => setIsHover(true)} onMouseLeave={() => mouseNodeLeave()}>
      {data.connectors?.map((conn: Connector) => {
        const [typeHandler, positionHandler] = GetHandleType(conn);

        return (
          <TreeHandleBox
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            key={"handle-treeview-" + conn.id}
            visible={IsPartOf(conn) && isHover}
            position={positionHandler}
          >
            <Handle type={typeHandler} position={positionHandler} id={conn.id} className="function-treeview-handler" />
          </TreeHandleBox>
        );
      })}
      <TreeNodeNameBox>{data.label ?? data.name}</TreeNodeNameBox>
      <LogoBox>
        <img src={EquinorLogo} alt="logo" className="logo" />
      </LogoBox>
      <SymbolBox>
        <Symbol base64={data.symbol} text={data.name} />
      </SymbolBox>
    </TreeNodeWrapper>
  );
};

export default memo(TreeNode);
