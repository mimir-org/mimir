import styled from "styled-components";
import { FontWeight } from "../../../../../../../compLibrary/font";

const TreeNodeNameBox = styled.p`
  margin: 0;
  font-weight: ${FontWeight.BOLD};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default TreeNodeNameBox;
