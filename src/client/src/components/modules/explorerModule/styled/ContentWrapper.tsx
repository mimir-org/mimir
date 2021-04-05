import styled from "styled-components";

const ContentWrapper = styled.div`
  float: right;
  width: 331px;
  visibility: ${(props: { visible: boolean }) =>
    props.visible ? "initial" : "hidden"};
  opacity: ${(props: { visible: boolean }) => (props.visible ? "1" : "0")};
  transition: visibility 0.2s linear, opacity 0.3s linear;
`;

export default ContentWrapper;
