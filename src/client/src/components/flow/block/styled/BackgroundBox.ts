import styled from "styled-components";
import { Size } from "../../../../compLibrary";

interface Props {
  visible: boolean;
  splitView: boolean;
  right: string;
}

const BackgroundBox = styled.div<Props>`
  position: absolute;
  top: 100px !important;
  visibility: ${(props) => !props.visible && "hidden"};
  height: ${Size.BlockView_Height}px !important;

  width: ${(props: { splitView: boolean }) =>
    props.splitView ? Size.SplitView_Width : Size.BlockView_Width}px !important;

  left: ${(props) =>
    props.right
      ? Size.BlockView_MarginLeft + Size.SplitView_Width + 90
      : Size.BlockView_MarginLeft - Size.BlockView_BackgroundMargin}px !important;
`;

export default BackgroundBox;
