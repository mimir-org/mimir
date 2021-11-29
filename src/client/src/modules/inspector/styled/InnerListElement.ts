import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";

interface Props {
  index: number;
}

const InnerListElement = styled.div<Props>`
  width: 200px;
  padding: 5px;
  background-color: ${(props) => (props.index % 2 === 0 ? Color.BlueLight : Color.White)};
`;

export default InnerListElement;
