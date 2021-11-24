import styled from "styled-components";
import { Color } from "../../colors";
import { FontSize } from "../../font";

interface Props {
  color: string;
}

const Box = styled.div<Props>`
  display: flex;
  justify-content: center;
  position: absolute;
  margin: auto;
  top: 25%;
  bottom: 25%;
  left: 25%;
  right: 25%;
  width: 285px;
  height: 172px;
  border: 1px solid ${(props) => props.color};
  border-radius: 10px;
  z-index: 10;
  background-color: ${Color.White};
  box-shadow: 0 5px 5px -2px rgba(0, 0, 0, 0.2);

  .text {
    position: absolute;
    height: 80px;
    margin-top: 30px;
    width: 265px;
    text-align: center;
    line-height: 1.5;
    font-size: ${FontSize.Standard};
  }
`;

export default Box;
