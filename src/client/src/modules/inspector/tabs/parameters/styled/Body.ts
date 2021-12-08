import styled from "styled-components";
import { Color } from "../../../../../compLibrary/colors";

interface Props {
  width: number;
}

const Body = styled.div<Props>`
  display: flex;
  border-bottom: 1px solid ${Color.GreyDark};
  width: max(100%, ${(props) => props.width}px);
  min-height: 120px;
`;

export default Body;
