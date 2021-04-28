import styled from "styled-components";

const TabColumn = styled.div`
  padding: 15px 0px 0px 25px;
  margin: auto;
  margin-left: inherit;
  width: 100%;

  position: ${(props) => (props.position ? "absolute" : "relative")};
  right: ${(props) => (props.position ? "351" : "0")}px;
`;

export default TabColumn;
