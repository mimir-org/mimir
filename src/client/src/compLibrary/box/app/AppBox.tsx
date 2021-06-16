import styled from "styled-components";

const AppBox = styled.div`
  width: 100%;
  height: 100%;

  ${(props: { loading: string }) =>
    props.loading === "loading" &&
    `opacity: 0.2;
    background: #ccc;
    `}
`;

export default AppBox;
