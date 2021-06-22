import styled from "styled-components";
import { FontSize } from "../../../../compLibrary";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  height: 160px;
`;

const ListContainer = styled.div`
  //border: red solid 1px;
  border: solid 2px #898787;
  border-radius: 3px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 150px;
  width: 460px;
  overflow-y: scroll;
`;

const ListElement = styled.div`
  width: 200px;
  margin: 10px;
  font-size: ${FontSize.Medium};
  --border: solid black 1px;
  display: flex;
  flex-wrap: wrap;
`;

const InnerListElement = styled.div`
  width: 200px;
  padding: 5px;
  background-color: ${(props) => (props.index % 2 === 0 ? "#D9EAEB" : "white")};
  --border: solid red 1px;
`;

const AttributesContainer = ({ attributes, title }) => {
  return (
    <Wrapper>
      <span>{title}</span>
      <ListContainer>
        {attributes?.map((a) => (
          <ListElement key={a.id}>
            <InnerListElement index={1}>
              <u>{a.name}</u>
            </InnerListElement>
            {a.attributes?.map((innerAttr, i) => (
              <InnerListElement index={i} key={innerAttr.id}>
                {innerAttr.key}
              </InnerListElement>
            ))}
          </ListElement>
        ))}
      </ListContainer>
    </Wrapper>
  );
};

export default AttributesContainer;
