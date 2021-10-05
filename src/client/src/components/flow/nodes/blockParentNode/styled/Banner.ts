import styled from "styled-components";
import { Color } from "../../../../../compLibrary";

const Header = styled.div`
  position: absolute;
  top: 0.3px;
  height: 30px;
  width: 100%;
  border-radius: 10px 10px 0px 0px;
  background-color: ${(props) =>
    props.location ? Color.LocationHeader : Color.FunctionHeader};
`;

export default Header;
