import styled from "styled-components";
import { Color } from "../../../componentLibrary";

const TreeviewWrapper = styled.div`
  cursor: pointer;
  position: absolute;
  margin-left: 20px;
  border: ${(props: { selected: string }) =>
    props.selected
      ? "1px solid " + `${Color.White}`
      : "1px solid " + `${Color.Grey}`};
  border-radius: 2px;
`;

export default TreeviewWrapper;
