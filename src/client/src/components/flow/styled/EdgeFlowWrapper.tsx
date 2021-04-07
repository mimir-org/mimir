import styled from "styled-components";

const EdgeFlowWrapper = styled.g`
  visibility: ${(props: { visible: boolean }) =>
    props.visible ? "initial" : "hidden"};
`;

export default EdgeFlowWrapper;
