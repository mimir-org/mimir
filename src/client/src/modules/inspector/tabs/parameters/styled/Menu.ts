import styled from "styled-components";
import { FontSize } from "../../../../../compLibrary";

const Menu = styled.div`
  display: flex;
  margin: 20px 0px 0px 5px;
  width: 550px;

  .link {
    font-size: ${FontSize.Medium};
    margin-left: 15px;
    margin-top: 7px;
    text-decoration: underline;
    cursor: pointer;
  }

  .hide-link {
    cursor: default;
    visibility: hidden;
  }
`;

export default Menu;
