import styled from "styled-components";
import { Color } from "../../../componentLibrary";

const TreeviewWrapper = styled.div`
  position: absolute;
  cursor: pointer;
  margin-left: 57px;
  border: ${(props: { selected: string }) =>
    props.selected ? `1px solid ${Color.White}` : `1px solid ${Color.Grey}`};
  border-radius: 2px;
`;

export default TreeviewWrapper;
