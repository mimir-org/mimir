import { VisualFilterResources } from "../../../../textResources";
import { createId } from "../../../flow/utils";
import { ContentColumn, Header } from "../styled";

const GetContent = (items: number, section: number) => {
  let text = VisualFilterResources.slice(section + items * 2);

  return (
    <div key={createId()}>
      <ContentColumn>
        {[...Array(items)].map((i, index: number) => {
          return (
            <div key={createId()}>
              {index === 0 && <Header>{VisualFilterResources[section]}</Header>}
              <label className={"checkbox"} key={createId()}>
                <input
                  type="checkbox"
                  key={createId()}
                  checked={false}
                  onChange={() => null}
                />
                <span className="checkmark" key={createId()}></span>
                <label className="checkbox_label">{text[index]}</label>
              </label>
            </div>
          );
        })}
      </ContentColumn>
      <ContentColumn>
        {[...Array(items)].map((i, index: number) => {
          return (
            <label className={"checkbox"} key={createId()}>
              <input
                type="checkbox"
                key={createId()}
                checked={false}
                onChange={() => null}
              />
              <span className="checkmark" key={createId()}></span>
              <label className="checkbox_label" key={createId()}>
                {text[index + 2]}
              </label>
            </label>
          );
        })}
      </ContentColumn>
    </div>
  );
};

export default GetContent;
