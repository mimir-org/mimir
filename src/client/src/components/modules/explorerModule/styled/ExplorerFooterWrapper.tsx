import styled from "styled-components";

const ExplorerFooterWrapper = styled.div`
  background-color: #f2f2f2;
  display: flex;
  width: inherit;
  position: absolute;
  bottom: 0;
  border-top: 1px solid #cbcbcb;
  visibility: ${(props: { visible: boolean }) =>
    props.visible ? "initial" : "hidden"};
  opacity: ${(props: { visible: boolean }) => (props.visible ? "1" : "0")};
  transition: visibility 0.2s linear, opacity 0.3s linear;
`;

export default ExplorerFooterWrapper;
