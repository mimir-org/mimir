import styled from "styled-components";

const SpinnerWrapper = styled.div`
  width: 100px;
  height: 100px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  ${(props: { loading: string }) =>
    !(props.loading === "loading") && `display: none;`}
`;

export default SpinnerWrapper;
