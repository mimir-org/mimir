import styled, { css } from "styled-components";
import { Color, FontSize } from "../../..";

interface Props {
  width: number;
  visible: boolean;
  disabled?: boolean;
}

const ButtonContainer = styled.div<Props>`
  pointer-events: initial;
  visibility: ${(props) => !props.visible && "hidden"};
  box-shadow: inset 0 0 0 1.5px ${Color.InspectorGreyBorder};
  border-radius: 4px;
  font-size: ${FontSize.Standard};
  background-color: ${Color.White};
  width: ${(props) => props.width}px;
  height: 23px;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 10px;

  ${(props) =>
    props.disabled &&
    css`
      box-shadow: inset 0 0 0 1px ${Color.InspectorGreyBorder};
      color: ${Color.GreyHeader};
      pointer-events: none;
    `}

  div {
    padding: 6px;
    padding-right: 4px;
  }

  svg {
    margin-left: auto;
    margin-right: 6px;
  }

  :hover {
    box-shadow: inset 0 0 0 2px ${Color.InspectorGreyBorder};
  }

  :active {
    box-shadow: inset 0 0 0 2px ${Color.InspectorDarkBorder};
  }
`;
export default ButtonContainer;
