import styled from "styled-components";
import { FontWeight } from "../../../../../../../compLibrary/font";

const BlockNodeNameBox = styled.p`
  max-width: 130px;
  margin: 0;
  font-weight: ${FontWeight.BOLD};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default BlockNodeNameBox;
