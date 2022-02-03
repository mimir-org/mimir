import styled from "styled-components";

interface Props {
  legend: boolean;
}

const LibBody = styled.div<Props>`
  width: calc(100% + 15px);
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: ${(props) => (props.legend ? 63 : 86)}%;

  @media screen and (max-height: 1100px) {
    max-height: ${(props) => (props.legend ? 52 : 78)}%;
  }

  @media screen and (max-height: 1000px) {
    max-height: ${(props) => (props.legend ? 45 : 72)}%;
  }

  @media screen and (max-height: 900px) {
    max-height: ${(props) => (props.legend ? 37 : 67)}%;
  }

  @media screen and (max-height: 700px) {
    max-height: ${(props) => (props.legend ? 25 : 53)}%;
  }

  @media screen and (max-height: 550px) {
    max-height: ${(props) => (props.legend ? 10 : 31)}%;
  }

  @media screen and (max-height: 400px) {
    max-height: ${(props) => (props.legend ? 5 : 21)}%;
  }
`;

export default LibBody;
