import styled from "styled-components";

interface Props {
  visible: boolean;
}

const LegendBody = styled.div<Props>`
  width: 331px;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: opacity 0.2s ease-in-out;
  bottom: 0;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  max-height: 265px;
`;

export default LegendBody;
