import styled from "styled-components";
import { Color, FontSize, FontType } from "..";

const DropdownMenuHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 183px;
  height: 31px;
  background: ${Color.White};
  border: 1px solid ${Color.DarkerGrey};
  border-radius: 5px;
  font-family: ${FontType.Standard};
  font-size: ${FontSize.Standard};
  color: ${Color.Black};

  p {
    padding: 5px;
  }

  img {
    width: 15px;
    height: 10px;
    margin-right: 4px;
    padding: 5px;
  }
`;

export default DropdownMenuHeader;