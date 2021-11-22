import styled from "styled-components";
import { Color } from "../../../colors";

interface Props {
  height: number;
  borderColor: string;
  borderRadius: number;
  fontSize: string;
}

const DropdownMenuHeader = styled.div<Props>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: ${(props) => props.height}px;
  background: ${Color.White};
  border: 1px solid ${(props: { borderColor: string }) => props.borderColor};
  border-radius: ${(props: { borderRadius: number }) => props.borderRadius}px;
  font-size: ${(props) => props.fontSize};
  color: ${Color.Black};

  p {
    padding: 5px;
  }

  img {
    margin-right: 4px;
    padding: 5px;
  }
`;

export default DropdownMenuHeader;
