import styled from "styled-components";

interface Props {
  fetching: boolean;
}

export const SpinnerWrapper = styled.div<Props>`
  width: 100px;
  height: 100px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: ${(props) => !props.fetching && "none"};
  z-index: 100;
`;
