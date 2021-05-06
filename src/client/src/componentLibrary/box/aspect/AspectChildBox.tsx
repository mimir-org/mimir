import styled from "styled-components";
import { CalculateIndentLevel } from "../../../assets/helpers";

const AspectChildWrapper = styled.div`
  margin-bottom: 6px;
  margin-top: 6px;
  margin-left: ${(props: { indent: number }) =>
    CalculateIndentLevel(props.indent)}px;
`;

export default AspectChildWrapper;
