import styled from "styled-components";
import { Color, FontSize } from "..";

const TerminalsElement = styled.div`
  border-bottom: 1px solid ${Color.DarkGrey};
  padding: 5px 34px 5px 5px;
  font-size: ${FontSize.Tiny};
  color: ${Color.Black};
  height: 15px;
  width: auto;
  min-width: 120px;
  position: relative;

  .text {
    position: absolute;
    left: 6px;
    bottom: -3px;
  }

  :last-child {
    border-bottom: none;
  }

  &:hover {
    text-decoration: underline;
    background-color: ${Color.LightCyan};
    cursor: pointer;

    :first-child {
      border-top-right-radius: 4px;
    }

    :last-child {
      border-bottom-right-radius: 4px;
      border-bottom-left-radius: 4px;
    }
  }
`;

export default TerminalsElement;
