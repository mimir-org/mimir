import styled from "styled-components";
import { Color } from "../../../compLibrary/colors";

const CreateCollectionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 30px 0px;

  button {
    min-width: 125px;
    white-space: nowrap;
    border-radius: 5px;
    background: ${Color.White};
    border: 1.5px solid ${Color.BlueMagenta};
    margin-left: 25px;
    height: 36px;
  }
`;

export default CreateCollectionWrapper;
