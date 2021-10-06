import styled from "styled-components";
import { Size } from "../../../../compLibrary";

const BackgroundBox = styled.div`
  position: absolute;
  top: 100px !important;
  visibility: ${(props) => !props.visible && "hidden"};
  height: ${Size.BlockView_Height}px !important;

  width: ${(props: { splitView: boolean }) =>
    props.splitView ? Size.SplitView_Width : Size.BlockView_Width}px !important;

  left: ${(props: { right: string }) =>
    props.right
      ? Size.BlockView_MarginLeft + Size.SplitView_Width + 50
      : Size.BlockView_MarginLeft - Size.BlockView_BackgroundMargin}px !important;
`;

export default BackgroundBox;
