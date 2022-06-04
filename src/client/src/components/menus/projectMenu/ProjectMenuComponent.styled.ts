import styled from "styled-components";
import { Color } from "../../../assets/color/Color";

export const ProjectMenuBox = styled.div`
  display: block;
  position: absolute;
  right: 0;
  background: ${Color.WHITE};
  height: auto;
  width: 250px;
  border-style: solid;
  border-color: ${Color.BASTILLE};
  border-width: 0 1px 1px 1px;
  border-radius: 0 0 10px 10px;
  z-index: 6;
  box-shadow: 0 5px 5px -2px rgba(0, 0, 0, 0.2);
`;
