import styled from "styled-components";
import { Size } from "..";

const BackgroundBox = styled.div`
  position: absolute;
  top: 100px !important;
  visibility: ${(props) => !props.visible && "hidden"};
  height: ${Size.BlockView_Height}px !important;

  width: ${(props) =>
    props.isSplitView
      ? `${Size.SplitView_Width}`
      : `${Size.BlockView_Width}`}px !important;

  left: ${(props) =>
    props.right
      ? `${Size.BlockView_MarginLeft + Size.SplitView_Width}`
      : `${
          Size.BlockView_MarginLeft - Size.BlockView_BackgroundMargin
        }`}px !important;
`;

export default BackgroundBox;
