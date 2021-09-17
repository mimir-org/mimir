import styled from "styled-components";
import { Size } from "..";
import Color from "../colors/Color";

const BlockParentBox = styled.div`
  position: absolute;
  opacity: 1 !important;
  top: 40px;
  cursor: ${(props) => (props.selected ? "default" : "pointer")};
  height: ${Size.BlockView_Height}px;

  width: ${(props) =>
    props.splitView ? `${Size.SplitView_Width}` : `${Size.BlockView_Width}`}px;

  left: ${(props) =>
    props.location && props.splitView
      ? `${Size.SplitView_Width - Size.BlockView_BackgroundMargin * 2}`
      : -`${Size.SplitView_MarginLeft}`}px;

  .header {
    padding: 0px 0px 0px 22px;
    font-size: 14px;
  }

  .content {
    border: 2px solid black;
    border-radius: 4px;
    width: inherit;
    height: inherit;
  }

  .icon {
    position: absolute;
    top: 14px;
  }

  .line {
    position: absolute;
    top: 37px;
    width: ${(props) =>
      props.splitView
        ? `${Size.SplitView_Width - 3}`
        : `${Size.BlockView_Width - 3}`}px;
    height: 2px;
    margin-left: 3px;
    background-color: ${(props) =>
      props.location ? Color.LocationBlock : Color.FunctionBlock};
  }
`;

export default BlockParentBox;
