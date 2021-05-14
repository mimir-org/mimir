import styled from "styled-components";
import { FontType } from "../";

const NodeBox = styled.div`
  z-index: 1200;
  font-family: ${FontType.Standard};
  width: 90px;
  height: 37px;
  position: absolute;
  right: 0px;
  top: 0px;
  padding-top: 10px;
`;

export default NodeBox;
