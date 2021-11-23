import styled from "styled-components";

interface Props {
  height: number;
}

const ChooseProperties = styled.div<Props>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0px 20px;
  position: relative;
  height: ${(props) => props.height}px;
`;

export default ChooseProperties;
