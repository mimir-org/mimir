import styled from "styled-components";
import { Color } from "../../../../compLibrary";

const MenuElement = styled.div`
  padding: 10px 20px 5px 20px;
  color: ${Color.BlueMagenta};
  cursor: pointer;

  .text {
    position: relative;
    bottom: 1px;
    margin-left: 10px;
    display: inline;
    vertical-align: super;
  }

  .icon {
    height: 24px;
    position: relative;
    bottom: 0px;
    left: 0px;
  }

  .toggle {
    height: 24px;
    position: relative;
    bottom: 0px;
    left: 10px;
  }

  &:hover {
    background-color: ${Color.LightBlue};
    text-decoration: underline;
  }

  &:last-child {
    margin-top: 40px;
    border-top: 1px solid #d7d8da;
    border-radius: 0px 0px 10px 10px;
  }
`;

export default MenuElement;
