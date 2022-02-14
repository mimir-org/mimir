import styled from "styled-components";

interface Props {
  isElectro: boolean;
}

const BoxWrapper = styled.div<Props>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${(props) => (props.isElectro ? "column" : "row")};
  padding: ${(props) => (props.isElectro ? "0 20px" : "20px 0")};
`;

export default BoxWrapper;
