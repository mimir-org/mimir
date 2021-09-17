import styled from "styled-components";

const InnerListElement = styled.div`
  width: 200px;
  padding: 5px;
  background-color: ${(props) => (props.index % 2 === 0 ? "#D9EAEB" : "white")};
`;

export default InnerListElement;
