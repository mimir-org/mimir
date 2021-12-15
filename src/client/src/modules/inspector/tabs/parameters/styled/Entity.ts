import styled from "styled-components";
import { Color } from "../../../../../compLibrary/colors";

interface Props {
  width: number;
}

const Entity = styled.div<Props>`
  width: ${(props) => props.width}px;
  border-right: 1px solid ${Color.GreyDark};
`;

export default Entity;
