import styled from "styled-components";

const TabColumn = styled.div`
  padding-top: 15px;
  padding-left: 15px;
  min-width: 200px;
  position: ${(props) => (props.position ? "absolute" : "relative")}
  right:${(props) => (props.position ? "351" : "0")}px;
`;

export default TabColumn;
