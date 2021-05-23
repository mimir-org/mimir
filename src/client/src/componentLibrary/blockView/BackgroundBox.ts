import styled from "styled-components";

const BackgroundBox = styled.div`
  visibility: ${(props) => (props.visible ? "initial" : "hidden")};
  width: ${(props) => (props.isSplitView ? "550" : "950")}px !important;
  height: 600px !important;
  top: 85px !important;
  left: ${(props) => (props.right ? "660" : "70")}px !important;
  position: absolute;
`;

export default BackgroundBox;
