import styled from "styled-components";
import { FontSize, Color } from "../../../../../../../compLibrary";

const ToolTip = styled.div`
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
  top: ${(props) => props.tooltipTopPosition}px;

  transition: 2s all ease;
  transition-delay: 0s;

  span {
    margin: auto;
  }
`;

export default ToolTip;
