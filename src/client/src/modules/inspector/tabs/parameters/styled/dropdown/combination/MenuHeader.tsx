import styled from "styled-components";
import { Color, FontSize } from "../../../../../../../compLibrary";

interface Props {
  open: boolean;
}

const MenuHeader = styled.div<Props>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 26px;
  width: 151px;
  background-color: ${(props) => props.color};
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  font-size: ${FontSize.Tiny};
  color: ${Color.White};

  p {
    padding: 10px;
    text-decoration: ${(props) => props.open && "underline"};
  }

  img {
    margin-right: 4px;
    padding: 5px;
  }

  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

export default MenuHeader;