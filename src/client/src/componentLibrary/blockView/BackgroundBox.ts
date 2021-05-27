import styled from "styled-components";
import { Size } from "..";

const BackgroundBox = styled.div`
  visibility: ${(props) => !props.visible && "hidden"};
  height: ${Size.BlockView_Height}px !important;
  width: ${(props) =>
    props.isSplitView
      ? `${Size.SplitView_Width}`
      : `${Size.BlockView_Width}`}px !important;
  top: 85px !important;
  left: ${(props) => (props.right ? "660" : "70")}px !important;
  position: absolute;
`;

export default BackgroundBox;
