import styled from "styled-components";
import { Color } from "../../";

const FooterBox = styled.div`
  visibility: ${(props: { visible: boolean }) => !props.visible && "hidden"};
  display: flex;
  width: inherit;
  height: 100px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  overflow: hidden;
  bottom: 50px;
  position: absolute;
  border-top: 1px solid ${Color.Grey};
`;

export default FooterBox;
