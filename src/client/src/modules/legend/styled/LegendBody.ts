import styled from "styled-components";
import { Size } from "../../../compLibrary/size";

const LegendBody = styled.div`
  position: relative;
  width: ${Size.ModuleOpen}px;
  top: 9px;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  max-height: 265px;
`;

export default LegendBody;
