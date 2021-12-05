import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";
import { FontSize } from "../../../compLibrary/font";

interface Props {
  active?: boolean;
}

const LibElement = styled.div<Props>`
  width: 278px;
  height: 30px;
  border: 1px solid;
  border-color: ${(props) => (props.active ? Color.Black : Color.GreyDarker)};
  border-style: ${(props) => (props.active ? "dashed" : "default")};
  border-radius: 3px;
  background-color: ${Color.White};
  margin: 0px 0px 3px 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${FontSize.Standard};
  padding-left: 10px;
  cursor: grab;

  .type-name {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    word-wrap: break-word;
    max-width: 248px;
  }

  &:hover {
    background-color: ${Color.BlueLight};
    text-decoration: underline;
  }
`;

export default LibElement;
