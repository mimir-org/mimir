import styled from "styled-components";
import { Color } from "../..";

const LibraryElementIcon = styled.div`
  display: flex;
  margin-right: 7px;
  width: 20px;
  max-width: 20px;
  height: 20px;
  border: 1.8px solid ${Color.Black};
  border-radius: 3px;
  background-color: ${(props: { color: string }) => props.color};
`;

export default LibraryElementIcon;
