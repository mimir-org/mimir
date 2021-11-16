import styled from "styled-components";
import { Size } from "../../../compLibrary/size";
import { Color } from "../../../compLibrary/colors";

interface Props {
  isProject: boolean;
}

const AccountMenuBox = styled.div<Props>`
  position: absolute;
  top: ${Size.TopMenu_Height}px;
  right: ${(props) => (props.isProject ? 380 : 0)}px;
  background: ${Color.White};
  padding-bottom: 15px;
  height: auto;
  width: 290px;
  border-style: solid;
  border-color: ${Color.BlueMagenta};
  border-width: 0px 1px 1px 1px;
  border-radius: 0px 0px 10px 10px;
  z-index: 6;
  box-shadow: 0 5px 5px -2px rgba(0, 0, 0, 0.2);
`;

export default AccountMenuBox;
