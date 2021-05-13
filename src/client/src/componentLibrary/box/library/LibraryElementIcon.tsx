import styled from "styled-components";

const LibraryElementIcon = styled.div`
  display: inline-flex;
  right: 20px;
  position: absolute;
  width: 20px;
  height: 20px;
  border: 1.8px solid black;
  border-radius: 3px;
  background-color: ${(props: { color: String }) => props.color};
`;

export default LibraryElementIcon;
