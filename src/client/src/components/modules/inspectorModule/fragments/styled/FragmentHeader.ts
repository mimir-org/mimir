import styled from "styled-components";

const FragmentHeader = styled.div`
  margin-right: 20px;
  margin-left: 20px;
  width: 15%;
  height: 180px;
  background-color: ${(props: { color: string }) => props.color};
  padding: 5px;
`;

export default FragmentHeader;
