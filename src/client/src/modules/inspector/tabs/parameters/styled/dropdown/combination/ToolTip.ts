import styled from "styled-components";
import { Color } from "../../../../../../../compLibrary";
import { FontSize } from "../../../../../../../compLibrary/font";

interface Props {
  top: number;
}

const ToolTip = styled.div<Props>`
  display: flex;

  width: auto;
  height: 15px;

  font-size: ${FontSize.ToolTip};
  background-color: ${Color.GreyInspector};

  border: 1px solid ${Color.Black};
  box-shadow: 1px 1px ${Color.Black};

  text-align: center;
  padding: 2px;

  position: absolute;
  z-index: 10;
  left: 90px;
  top: ${(props) => props.top}px;

  transition: 2s all ease;
  transition-delay: 0s;

  span {
    margin: auto;
  }
`;

export default ToolTip;
