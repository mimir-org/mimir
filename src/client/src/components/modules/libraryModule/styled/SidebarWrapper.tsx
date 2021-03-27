import styled from "styled-components";

const SidebarWrapper = styled.div`
  margin-top: 70px;
  padding: 20px;
  overflow: hidden;
  visibility: ${(props: { visible: boolean }) =>
    props.visible ? "initial" : "hidden"};
`;

export default SidebarWrapper;
