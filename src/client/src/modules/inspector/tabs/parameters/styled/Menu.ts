import styled from "styled-components";
import { FontSize } from "../../../../../compLibrary/font";

const Menu = styled.div`
  display: flex;
  gap: 15px;
  align-content: center;
  max-width: 550px;

  .link {
    font-size: ${FontSize.Medium};
    text-decoration: underline;
    cursor: pointer;
  }

  .hide-link {
    cursor: default;
    visibility: hidden;
  }
`;

export default Menu;
