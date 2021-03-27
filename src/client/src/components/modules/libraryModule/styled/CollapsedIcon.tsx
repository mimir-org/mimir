import styled from "styled-components";

const CollapsedIcon = styled.div`
  position: absolute;
  margin-left: 5px;
  margin-top: 59px;
  visibility: ${(props: { visible: boolean }) =>
    props.visible ? "hidden" : "initial"};
`;

export default CollapsedIcon;
