import styled from "styled-components";
import { Color } from "../../../../compLibrary/colors";
import { FontSize } from "../../../../compLibrary/font";

const UserMenuElement = styled.div`
  padding: 10px 20px 10px 20px;
  color: ${Color.BlueMagenta};
  cursor: pointer;

  .text {
    position: relative;
    display: inline;
    top: 2px;
    margin-left: 10px;
    font-size: ${FontSize.Standard};
    vertical-align: super;

    &:hover {
      text-decoration: underline;
    }
  }

  .icon {
    position: relative;
    height: 18px;
    width: 18px;
    bottom: 0px;
    left: 0px;
  }

  .toggle {
    position: relative;
    height: 24px;
    bottom: 0px;
    left: 2px;
  }

  &:hover {
    background-color: ${Color.BlueLight};
  }

  &:last-child {
    margin-top: 10px;
    border-top: 1px solid ${Color.Grey};
    border-radius: 0px 0px 10px 10px;
  }
`;

export default UserMenuElement;
