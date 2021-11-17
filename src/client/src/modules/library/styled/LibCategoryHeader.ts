import styled from "styled-components";
import { FontSize, FontWeight } from "../../../compLibrary/font";

const LibCategoryHeader = styled.span`
  display: flex;
  position: relative;
  padding: 7px 30px 7px 0px;
  cursor: pointer;
  font-size: ${FontSize.Standard};
  font-weight: ${FontWeight.Bold};
  width: 80%;
`;

export default LibCategoryHeader;
