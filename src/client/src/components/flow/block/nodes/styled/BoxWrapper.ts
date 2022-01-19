import styled from "styled-components";

interface Props {
  isElectro: boolean;
}

const BoxWrapper = styled.div<Props>`
  display: flex;
  flex-direction: ${(props) => (props.isElectro ? "column" : "row")};
  justify-content: center;
  align-items: center;
`;

export default BoxWrapper;
