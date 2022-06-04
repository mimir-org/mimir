import styled from "styled-components";
import { Size } from "../../../compLibrary/size/Size";
import { Color } from "../../../assets/color/Color";

interface Props {
  isOpen: boolean;
}

const LegendHeader = styled.button<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: ${Size.MODULE_OPEN}px;
  padding: ${(props) => (props.isOpen ? "20px 0" : "10px 0")};

  background: transparent;
  border: 0;
  margin: 0;
  font: inherit;
  cursor: inherit;

  border-top: 1px solid ${Color.GAINSBORO};
`;

export default LegendHeader;
