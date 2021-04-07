import styled from "styled-components";

const AspectFlowWrapper = styled.div`
  visibility: ${(props: { visible: boolean }) =>
    props.visible ? "inherit" : "hidden"};
`;

export default AspectFlowWrapper;
