import styled from "styled-components";
import { Color, FontSize } from "..";

const MessageBox = styled.div`
  width: 200px;
  height: 100px;
  position: absolute;
  right: -300px;
  top: 300px;
  border: 2px solid ${Color.DeepCyan};
  font-size: ${FontSize.Standard};
  line-height: 1.5;
  padding: 10px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
`;

export default MessageBox;
