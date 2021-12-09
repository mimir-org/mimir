import styled from "styled-components";

interface Props {
  color: string;
}

const ColorTag = styled.span<Props>`
  width: 100%;
  height: 100%;
  border-left: 12px solid ${(props) => props.color};
  padding-left: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  line-height: 2.5;
`;

export default ColorTag;
