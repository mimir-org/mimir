import styled from "styled-components";

const TabColumn = styled.div`
  padding: 15px 0px 0px 15px;
  margin: auto;
  margin-left: inherit;
  min-width: 220px;
  width: 100%;

  position: ${(props) => (props.position ? "absolute" : "relative")};
  right: ${(props) => (props.position ? "351" : "0")}px;
`;

export default TabColumn;
