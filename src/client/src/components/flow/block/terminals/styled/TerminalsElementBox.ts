import styled from "styled-components";
import { Color } from "../../../../../compLibrary/colors/Color";
import { FontSize } from "../../../../../compLibrary/font";

const TerminalsElementBox = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 5px;
  padding-left: 5px;
  height: 25px;
  border-bottom: 1px solid ${Color.LIGHT_SILVER};
  font-size: ${FontSize.TINY};
  color: ${Color.BLACK};

  &:hover {
    background-color: ${Color.LAVANDER_WEB_HOVER};
    text-decoration: underline;
    cursor: pointer;
  }

  :first-child {
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
  }

  :last-child {
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
    border-bottom: none;
  }
`;

export default TerminalsElementBox;
