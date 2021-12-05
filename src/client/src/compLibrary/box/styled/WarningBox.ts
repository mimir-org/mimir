import styled from "styled-components";

interface Props {
  visible: boolean;
}

const WarningBox = styled.div<Props>`
  display: flex;
  position: absolute;
  left: 0;
  margin: 5px 0px 0px 8px;
  width: 16px;
  height: 16px;
  opacity: ${(props) => (props.visible ? 1 : 0)};
`;

export default WarningBox;
