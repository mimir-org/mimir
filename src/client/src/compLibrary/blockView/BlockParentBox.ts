import styled from "styled-components";
import { Color, Size } from "..";

/** Styled component that sits on top of the BlockParentNode */

const BlockParentBox = styled.div`
  position: absolute;
  opacity: 1 !important;
  z-index: 1;
  cursor: ${(props) => (props.selected ? "default" : "pointer")};
  height: ${Size.BlockView_Height}px;
  border: ${(props) => props.location && "2px solid #fa00ff"};
  border-radius: 5px;
  background-color: ${(props) => !props.location && `${Color.FunctionBlock}`};

  width: ${(props) =>
    props.splitView ? `${Size.SplitView_Width}` : `${Size.BlockView_Width}`}px;

  left: ${(props) =>
    props.location &&
    props.splitView &&
    `${Size.SplitView_Width + Size.BlockView_BackgroundMargin}`}px;

  .header {
    position: absolute;
    top: -43px;
    padding: 0px 0px 0px 22px;
    font-size: 14px;
    width: fit-content;
  }

  .icon {
    position: absolute;
    top: -28px;
    left: 0px;
  }
`;

export default BlockParentBox;
