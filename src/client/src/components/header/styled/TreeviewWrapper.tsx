import styled from "styled-components";

const TreeviewWrapper = styled.div`
  cursor: pointer;
  position: absolute;
  margin-left: 20px;
  border: ${(props: { on: boolean }) =>
    props.on ? "1px solid #FFFFFF" : "1px solid #CBCBCB"};
  border-radius: 2px;
`;

export default TreeviewWrapper;
