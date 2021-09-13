import styled from "styled-components";
import { Color, FontSize } from "../../../";

const DropdownMenuHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 28px;
  background: ${Color.White};
  border: 1px solid ${Color.Black};
  border-radius: 5px;
  font-size: ${FontSize.Standard};
  color: ${Color.Black};

  p {
    padding: 10px;
  }

  img {
    width: 15px;
    height: 10px;
    margin-right: 4px;
    padding: 5px;
  }
`;

export default DropdownMenuHeader;
