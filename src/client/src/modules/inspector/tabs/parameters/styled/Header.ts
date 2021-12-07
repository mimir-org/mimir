import styled from "styled-components";
import { Color } from "../../../../../compLibrary/colors";

const Header = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;

  position: sticky;
  top: 0;
  z-index: 5;

  background-color: ${Color.GreyInspector};
  border-bottom: 1px solid ${Color.Grey};
`;

export default Header;
