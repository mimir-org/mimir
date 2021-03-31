import styled from "styled-components";

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 331px;
  height: 80%;
  overflow: hidden;
  visibility: ${(props: { visible: boolean }) =>
    props.visible ? "initial" : "hidden"};
  opacity: ${(props: { visible: boolean }) => (props.visible ? "1" : "0")};
  transition: visibility 0.2s linear, opacity 0.3s linear;
`;

export default ContentWrapper;
