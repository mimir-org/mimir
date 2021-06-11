import styled from "styled-components";
import { Size } from "..";

const FunctionBox = styled.div`
  position: absolute;
  opacity: 1 !important;
  top: 40px;
  height: ${Size.BlockView_Height}px;

  width: ${(props) =>
    props.splitView ? `${Size.SplitView_Width}` : `${Size.BlockView_Width}`}px;

  left: ${(props) =>
    props.location
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
`;

export default FunctionBox;
