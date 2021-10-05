import styled from "styled-components";
import { Color, Size } from "../../";

const AccountMenuBox = styled.div`
  position: absolute;
  top: ${Size.TopMenu_Height}px;
  right: 0px;
  background: ${Color.White};
  padding-bottom: 6px;
  padding-top: 8px;
  height: min-content;
  width: auto;
  min-width: ${Size.ModuleOpen}px;
  border-style: solid;
  border-color: ${Color.Grey};
  border-width: 0px 0px 1px 1px;
  z-index: 6;
  box-shadow: 0 5px 5px -2px rgba(0, 0, 0, 0.2);
`;

export default AccountMenuBox;
