import styled from "styled-components";
import { Color, FontSize } from "../../../";

const DropdownMenuHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 31px;
  background: ${Color.White};
  border: 1.5px solid ${Color.Black};
  border-radius: 5px;
  font-size: ${FontSize.Standard};
  color: ${Color.Black};

  p {
    padding: 10px;
  }

  img {
    margin-right: 4px;
    padding: 5px;
  }
`;

export default DropdownMenuHeader;
