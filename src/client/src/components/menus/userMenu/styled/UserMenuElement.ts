import styled from "styled-components";
import { Color } from "../../../../compLibrary/colors";

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

    &:hover {
      text-decoration: underline;
    }
  }

  .darkmode-text {
    position: relative;
    bottom: 2px;
    margin-left: 25px;
    display: inline;
    vertical-align: super;
    color: ${Color.TextSecondary};
    font-size: 12px;
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
    left: 2px;
  }

  &:hover {
    background-color: ${Color.LightBlue};
  }

  &:last-child {
    margin-top: 40px;
    border-top: 1px solid #d7d8da;
    border-radius: 0px 0px 10px 10px;
  }
`;

export default MenuElement;
