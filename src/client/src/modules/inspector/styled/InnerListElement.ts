import styled from "styled-components";
import { Color } from "../../../compLibrary";

interface Props {
  index: number;
}

const InnerListElement = styled.div<Props>`
  width: 200px;
  padding: 5px;
  background-color: ${(props) => (props.index % 2 === 0 ? Color.LightBlue : Color.White)};
`;

export default InnerListElement;
