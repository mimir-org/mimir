import styled from "styled-components";
import { Color, FontSize } from "..";

const BlockMessageBox = styled.div`
  width: 200px;
  position: absolute;
  right: -300px;
  top: 270px;
  border: 2px solid ${Color.DeepCyan};
  font-size: ${FontSize.Standard};
  text-align: center;
  line-height: 1.5;
  padding: 10px;
  box-shadow: -1px 4px 5px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
`;

export default BlockMessageBox;
