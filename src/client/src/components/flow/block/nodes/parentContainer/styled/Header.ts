import styled from "styled-components";
import { FontSize } from "../../../../../../compLibrary/font";

const Header = styled.div`
  display: flex;
  justify-content: center;
  font-size: ${FontSize.Standard};
  position: relative;
  bottom: 7px;
  font-weight: bold;

  .text {
    margin-left: 20px;
  }
`;

export default Header;
