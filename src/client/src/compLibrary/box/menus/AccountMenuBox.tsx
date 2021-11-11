import styled from "styled-components";
import { Color, Size } from "../../";

const AccountMenuBox = styled.div`
  position: absolute;
  top: ${Size.TopMenu_Height}px;
  right: 0px;
  background: ${Color.White};
  padding: 15px 0px;
  height: auto;
  width: auto;
  border-style: solid;
  border-color: ${Color.BlueMagenta};
  border-width: 0px 1px 1px 1px;
  border-radius: 0px 0px 10px 10px;
  z-index: 6;
  box-shadow: 0 5px 5px -2px rgba(0, 0, 0, 0.2);
`;

export default AccountMenuBox;
