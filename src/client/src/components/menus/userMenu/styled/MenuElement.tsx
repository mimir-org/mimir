import styled from "styled-components";
import { Color } from "../../../../compLibrary";

const MenuElement = styled.div`
  padding: 5px 20px 5px 20px;
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

  &:hover {
    background-color: ${Color.LightBlue};
    text-decoration: underline;
  }
`;

export default MenuElement;
