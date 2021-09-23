import styled from "styled-components";
import { Color } from "../../../../../compLibrary";

const Entity = styled.div`
  width: ${(props: { width: number }) => props.width}px;
  height: inherit;
  border-right: 1px solid ${Color.DarkGrey};
  border-bottom: 1px solid ${Color.DarkGrey};
`;
export default Entity;
