import { Node } from "../../../../../models";
import { Banner, Block, Header, LogoBox, ResizeButton } from "./styled";
import { GetCompanyLogoForNode, IsLocation } from "../../../../../helpers";
import { Background, BackgroundVariant } from "react-flow-renderer";
import { Color } from "../../../../../compLibrary/colors";
import { ResizeIcon } from "../../../../../assets/icons/resize";
import { useOnResize } from "./handlers";
import { useCallback, useEffect, useRef, useState } from "react";
import { GetFlowNodeByDataId } from "../../helpers";
import { Direction } from "./helpers/constants";
import { setBlockNodeHeight } from "../../redux/actions";
import { nodeSizeSelector, useAppSelector } from "../../../../../redux/store";

interface Props {
  node: Node;
  color: string;
  selected: boolean;
  width: number;
  height: number;
  hasChildren: boolean;
  company: string;
  dispatch: any;
}

/**
 * Component for the parent node block in BlockView.
 * @param interface
 * @returns a container that sits on top of a Flow node.
 */
const ParentContainerComponent = ({ node, color, selected, width, height, hasChildren, company, dispatch }: Props) => {
  // const [direction, setDirection] = useState("");
  // const [mouseDown, setMouseDown] = useState(false);

  // const MIN_HEIGHT = 800;
  // const parentNode = document.getElementById("block-" + node.id);
  // const parentNodeFlow = GetFlowNodeByDataId(node.id);
  // const parentNodeSize = useAppSelector(nodeSizeSelector);

  // let nodeHeight = parentNodeSize.height;
  // const prevY = useRef(nodeHeight);

  // const onResize = useCallback(
  //   (e) => {
  //     const dy = prevY.current - e.clientY;
  //     prevY.current = e.clientY;

  //     nodeHeight = parseInt(getComputedStyle(parentNode, "").height) - dy;

  //     if (nodeHeight > MIN_HEIGHT) {
  //       parentNode.style.height = nodeHeight + "px";
  //       parentNodeFlow.style.height = nodeHeight + "px";
  //     }
  //   },
  //   [parentNode, parentNodeFlow]
  // );

  // useEffect(() => {
  //   const handleMouseMove = (e) => {
  //     if (!direction) return;
  //     onResize(e);
  //   };

  //   if (mouseDown) window.addEventListener("mousemove", handleMouseMove);

  //   return () => {
  //     window.removeEventListener("mousemove", handleMouseMove);
  //   };
  // }, [mouseDown, direction, onResize]);

  // useEffect(() => {
  //   const handleMouseUp = () => setMouseDown(false);
  //   window.addEventListener("mouseup", handleMouseUp);

  //   if (nodeHeight >= MIN_HEIGHT) {
  //     console.log("her");
  //     dispatch(setBlockNodeHeight(nodeHeight));
  //   }

  //   return () => {
  //     window.removeEventListener("mouseup", handleMouseUp);
  //   };
  // }, [dispatch, nodeHeight]);

  // const handleMouseDown = (dir) => () => {
  //   setDirection(dir);
  //   setMouseDown(true);
  // };

  // const HandleResize = () => {
  //   useOnResize(node.id);
  // };

  return (
    <Block id={"block-" + node?.id} selected={selected} width={width} height={height}>
      <Banner color={color}>
        <Header>
          <p className="text">={node?.label ?? node?.name}</p>
        </Header>
        <LogoBox hasChildren={hasChildren}>
          <img src={GetCompanyLogoForNode(company, node, hasChildren)} alt="logo" className="logo" />
        </LogoBox>
      </Banner>
      {/* <ResizeButton id="ResizeParentNode" onMouseDown={handleMouseDown(Direction.Bottom)}>
        <img src={ResizeIcon} alt="resize" className="icon" />
      </ResizeButton> */}
      {IsLocation(node) && <Background variant={BackgroundVariant.Lines} color={Color.Grey} gap={20} />}
      {!IsLocation(node) && <Background variant={BackgroundVariant.Dots} color={Color.Black} gap={20} />}
    </Block>
  );
};

export default ParentContainerComponent;
