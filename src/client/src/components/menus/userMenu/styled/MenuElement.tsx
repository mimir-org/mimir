import styled from "styled-components";
import { Color } from "../../../../compLibrary";

const MenuElement = styled.div`
  padding: 5px 20px 5px 20px;
  color: ${Color.BlueMagenta};
  cursor: pointer;

  .text {
    position: relative;
    top: 2px;
    margin-left: 12px;
    display: inline;
    vertical-align: super;
  }

  .icon {
    position: relative;
    bottom: 0px;
    left: 0px;
  }

  &:hover {
    background-color: ${Color.LightBlue};
    text-decoration: underline;
  }

  &:last-child {
    border-radius: 0px 0px 10px 10px;
  }
`;

export default MenuElement;
