import styled from "styled-components";

const CollapsedIcon = styled.div`
  float: right;
  margin-left: 200px;
  margin-top: 14px;
  margin-right: 8px;
  visibility: ${(props: { visible: boolean }) =>
    props.visible ? "hidden" : "initial"};
`;

export default CollapsedIcon;
