import styled from "styled-components";

const OptionsBox = styled.div`
  visibility: ${(props) => !props.visible && "hidden"};
  position: absolute;
  right: -1px;
  top: -1px;
  cursor: pointer;
`;

export default OptionsBox;
