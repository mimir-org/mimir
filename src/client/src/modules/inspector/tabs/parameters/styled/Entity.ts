import styled from "styled-components";
import { Color } from "../../../../../compLibrary/colors";

interface Props {
  width: number;
}

const Entity = styled.div<Props>`
  width: ${(props) => props.width}px;
  height: inherit;
  border-right: 1px solid ${Color.GreyDark};
  border-bottom: 1px solid ${Color.GreyDark};
`;
export default Entity;
