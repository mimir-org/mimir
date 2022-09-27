import styled from "styled-components";
import { Color } from "../../../../../../../../assets/color/Color";

interface Props {
  height: number;
  borderColor: string;
  borderRadius: number;
  fontSize: string;
}

export const AttributesDropdownHeaderBox = styled.div<Props>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: ${(props) => props.height}px;
  width: auto;
  background: ${Color.PALE_PURPLE_PANTONE};

  border: 1px solid ${(props) => props.borderColor};
  border-radius: ${(props) => props.borderRadius}px;
  font-size: ${(props) => props.fontSize};
  color: ${Color.BLACK};

  p {
    margin: 0;
    padding: 1px 10px 0px 10px;
  }

  img {
    margin-right: 4px;
    padding: 5px;
  }
`;
