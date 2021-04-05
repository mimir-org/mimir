import styled from "styled-components";

const SidebarWrapper = styled.div`
  margin-top: 70px;
  padding: 20px;
  overflow: hidden;
  visibility: ${(props: { visible: boolean }) =>
    props.visible ? "initial" : "hidden"};
  opacity: ${(props: { visible: boolean }) => (props.visible ? "1" : "0")};
  transition: visibility 0.2s linear, opacity 0.2s linear;
`;

export default SidebarWrapper;
