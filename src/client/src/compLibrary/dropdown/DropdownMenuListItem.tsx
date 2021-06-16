import styled from "styled-components";
import { Color, FontSize } from "..";

const DropdownMenuListItem = styled.div`
  display: flex;
  height: 31px;
  align-items: center;
  border-width: 1px 0px 0px 0px;
  border-style: solid;
  border-color: ${Color.Grey};
  border-radius: 0px;
  font-size: ${FontSize.Standard};
  color: ${Color.Black};
  background-color: ${Color.White};
  cursor: pointer;
  z-index: 1;

  p {
    padding: 5px;
  }

  :hover {
    background-color: ${Color.LightBlue};
    p {
      text-decoration: underline;
    }
  }
`;

export default DropdownMenuListItem;
