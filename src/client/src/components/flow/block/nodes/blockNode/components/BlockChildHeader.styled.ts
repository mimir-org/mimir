import styled from "styled-components";
import { FontWeight } from "../../../../../../assets/font";

export const NodeBoxHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const BlockNodeNameBox = styled.p`
  max-width: 130px;
  margin: 0;
  font-weight: ${FontWeight.BOLD};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
