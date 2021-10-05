import styled from "styled-components";
import { Color } from "../../../compLibrary";

const InnerListElement = styled.div`
  width: 200px;
  padding: 5px;
  background-color: ${(props) => (props.index % 2 === 0 ? Color.LightBlue : Color.White)};
`;

export default InnerListElement;
