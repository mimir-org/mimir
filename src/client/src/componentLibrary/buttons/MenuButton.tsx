import styled from "styled-components";
import { Color, FontSize, FontType } from "..";

const MenuButton = styled.button`
  width: ${(props) => (props.wide ? "130px" : "94px")};
  height: 34px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: ${Color.LightGrey};
  border: 1px solid ${Color.DeepCyan};
  border-radius: 2px;
  padding-left: 10px;
  cursor: pointer;
  font-family: ${FontType.Standard};
  font-size: ${FontSize.Standard};
  color: ${Color.Black};
  margin: 10px 0px;

  .icon {
    position: absolute;
    right: 0px;
    margin-right: 7px;
  }

  &:hover {
    border: 2px solid ${Color.DeepCyan};
  }
`;

export default MenuButton;
