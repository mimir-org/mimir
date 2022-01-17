import styled from "styled-components";

interface Props {
  isElectro: boolean;
}

const HandleContainer = styled.div<Props>`
  display: flex;
  gap: 4px;
  flex-direction: ${(props) => props.isElectro ? 'row' : 'column'};
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`;

export default HandleContainer;