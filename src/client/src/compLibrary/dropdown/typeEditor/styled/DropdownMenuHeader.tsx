import styled from "styled-components";
import { Color } from "../../../colors";
import { FontSize } from "../../../font";

const DropdownMenuHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 27px;
  background: ${Color.White};
  border: 1.5px solid ${Color.Black};
  border-radius: 5px;
  font-size: ${FontSize.Standard};
  color: ${Color.Black};

  p {
    padding: 5px 0px 5px 9px;
  }

  img {
    padding: 11px 10px;
  }
`;

export default DropdownMenuHeader;
