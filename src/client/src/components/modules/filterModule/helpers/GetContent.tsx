import { VisualFilterResources } from "../../../../textResources";
import { ContentColumn, Header } from "../styled";

const GetContent = (items: number, section: number) => {
  let text = VisualFilterResources.slice(section + items * 2);

  return (
    <>
      <ContentColumn>
        {[...Array(items)].map((i, index: number) => {
          return (
            <>
              {index === 0 && <Header>{VisualFilterResources[section]}</Header>}
              <label className={"checkbox"}>
                <input type="checkbox" checked={false} onChange={() => null} />
                <span className="checkmark"></span>
                <label className="checkbox_label">{text[index]}</label>
              </label>
            </>
          );
        })}
      </ContentColumn>
      <ContentColumn>
        {[...Array(items)].map((i, index: number) => {
          return (
            <label className={"checkbox"}>
              <input type="checkbox" checked={false} onChange={() => null} />
              <span className="checkmark"></span>
              <label className="checkbox_label">{text[index + 2]}</label>
            </label>
          );
        })}
      </ContentColumn>
    </>
  );
};

export default GetContent;
