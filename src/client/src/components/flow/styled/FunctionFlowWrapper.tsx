import styled from "styled-components";

const FunctionFlowWrapper = styled.div`
  visibility: ${(props: { visible: boolean }) =>
    props.visible ? "initial" : "hidden"};
`;

export default FunctionFlowWrapper;
