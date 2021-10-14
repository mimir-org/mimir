import styled from "styled-components";
interface Props {
  wide?: number;
}

const TypePreviewColumn = styled.div<Props>`
  display: flex;
  flex: ${(props) => (props.wide === undefined ? 1 : props.wide)};
  flex-direction: column;
`;

export default TypePreviewColumn;
