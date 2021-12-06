import styled from "styled-components";
import { Color } from "../../../../../compLibrary/colors";

interface Props {
  width: number;
}

const Body = styled.div<Props>`
  display: flex;
  flex-direction: row;
  height: 108px;
  border-bottom: 1px solid ${Color.GreyDark};
  width: max(100%, ${(props) => props.width}px);
`;

export default Body;
