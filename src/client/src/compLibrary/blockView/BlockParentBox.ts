import styled from "styled-components";
import { Color, FontSize, Size } from "..";

/** Styled component that sits on top of a Block element in Mimir. */
const BlockParentBox = styled.div`
  position: absolute;
  opacity: 1 !important;
  z-index: 1;
  cursor: ${(props) => (props.selected ? "default" : "pointer")};
  height: ${Size.BlockView_Height}px;
  border-radius: 10px;
  border: 2px solid;
  background-color: ${(props) => !props.location && Color.Black};

  border-color: ${(props) =>
    props.location ? Color.LocationTab : Color.FunctionTab};

  width: ${(props) =>
    props.splitView ? Size.SplitView_Width : Size.BlockView_Width}px;

  .banner {
    position: absolute;
    top: 0.3px;
    height: 30px;
    width: 100%;
    border-radius: 10px 10px 0px 0px;
    background-color: ${(props) =>
      props.location ? Color.LocationHeader : Color.FunctionHeader};
  }

  .header {
    position: absolute;
    top: -7px;
    padding: 0px 0px 0px 20px;
    font-size: ${FontSize.Standard};
    width: fit-content;
  }
`;

export default BlockParentBox;
