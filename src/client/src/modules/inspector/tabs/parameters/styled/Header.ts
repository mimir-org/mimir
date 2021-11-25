import styled from "styled-components";
import { Color } from "../../../../../compLibrary/colors";

const Header = styled.div`
  display: flex;
  flex-direction: column;
  height: 70px;

  position: sticky;
  top: 0px;
  z-index: 5;

  background-color: ${Color.GreyInspector};

  & > hr {
    margin-top: 10px;
    width: 100%;
    margin-bottom: 0px;
    color: ${Color.GreyDark};
    border-style: solid;
    border-width: 1px 0px 0px 0px;
  }
`;

export default Header;
