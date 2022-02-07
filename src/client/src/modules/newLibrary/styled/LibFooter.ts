import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";

interface Props {
  libOpen: boolean;
}

const LibFooter = styled.div<Props>`
  opacity: ${(props) => (props.libOpen ? 1 : 0)};
  display: flex;
  flex-direction: column;
  width: inherit;
  min-height: 200px;
  padding: 25px 20px;
  position: absolute;
  bottom: 0;
  background-color: ${Color.GreyLighter};
  box-shadow: 0px -4px 10px 1px rgba(0, 0, 0, 0.05);
`;

export default LibFooter;
