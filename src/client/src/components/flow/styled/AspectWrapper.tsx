import styled from "styled-components";

const AspectWrapper = styled.div`
  visibility: ${(props: { visible: boolean }) =>
    props.visible ? "inherit" : "hidden"};
`;

export default AspectWrapper;
