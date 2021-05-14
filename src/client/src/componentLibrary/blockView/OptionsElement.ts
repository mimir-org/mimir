import styled from "styled-components";
import { Color, FontSize } from "..";

const OptionsElement = styled.div`
  border-bottom: 1px solid ${Color.DarkGrey};
  padding: 5px 5px 5px 5px;
  text-align: left;
  font-size: ${FontSize.Small};
  color: ${Color.Black};
  height: 15px;

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

export default OptionsElement;
