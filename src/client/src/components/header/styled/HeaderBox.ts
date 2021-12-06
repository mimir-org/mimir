import styled from "styled-components";
import { Size } from "../../../compLibrary/size";
import { Color } from "../../../compLibrary/colors";

const HeaderBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: right;
  align-content: center;
  height: ${Size.TopMenu_Height}px;
  background-color: ${Color.BlueMagenta};
  color: ${Color.White};
`;

export default HeaderBox;
