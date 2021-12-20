import styled from "styled-components";
import { Size } from "../../../compLibrary/size";

const LegendBody = styled.div`
  width: ${Size.ModuleOpen}px;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  max-height: 265px;
  padding: 0 15px 10px 15px;
`;

export default LegendBody;
