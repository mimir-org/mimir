import styled from "styled-components";

interface Props {
  legend: boolean;
}

const LibraryBody = styled.div<Props>`
  position: fixed;
  margin-left: 15px;
  width: 306px;
  height: auto;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-right: 10px;
  max-height: ${(props) => (props.legend ? 50 : 72)}%;

  @media screen and (max-height: 1100px) {
    max-height: ${(props) => (props.legend ? 40 : 66)}%;
  }

  @media screen and (max-height: 1000px) {
    max-height: ${(props) => (props.legend ? 30 : 61)}%;
  }

  @media screen and (max-height: 900px) {
    max-height: ${(props) => (props.legend ? 20 : 57)}%;
  }

  @media screen and (max-height: 700px) {
    max-height: ${(props) => (props.legend ? 25 : 47)}%;
  }

  @media screen and (max-height: 550px) {
    max-height: ${(props) => (props.legend ? 10 : 31)}%;
  }

  @media screen and (max-height: 400px) {
    max-height: ${(props) => (props.legend ? 5 : 21)}%;
  }
`;

export default LibraryBody;
