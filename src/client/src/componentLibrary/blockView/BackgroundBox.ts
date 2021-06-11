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
  left: ${(props) =>
    props.right ? "1060" : "370"}px !important; // TODO: remove magic numbers
  position: absolute;
`;

export default BackgroundBox;
