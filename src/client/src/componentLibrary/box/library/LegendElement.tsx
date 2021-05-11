import styled from "styled-components";
import { Color } from "../..";

const LegendElement = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0px 15px -10px 15px;
  background: ${Color.White};
  border-radius: 5px;
  padding: 6px 10px;
  color: ${Color.Black};
`;

export default LegendElement;
