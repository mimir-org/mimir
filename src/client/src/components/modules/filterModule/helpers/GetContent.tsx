import { VisualFilterResources } from "../../../../textResources";
import { CreateId } from "../../../flow/helpers";
import { ContentColumn, Header } from "../styled";

const GetContent = (items: number, section: number) => {
  let text = VisualFilterResources.slice(section + items * 2);

  // TODO: fix this when content for filter is known

  return (
    <div key={CreateId()}>
      <ContentColumn>
        {[...Array(items)].map((i, index: number) => {
          return (
            <div key={CreateId()}>
              {index === 0 && <Header>{VisualFilterResources[section]}</Header>}
              <label className={"checkbox"} key={CreateId()}>
                <input
                  type="checkbox"
                  key={CreateId()}
                  checked={false}
                  onChange={() => null}
                />
                <span className="checkmark" key={CreateId()}></span>
                <label className="checkbox_label">{text[index]}</label>
              </label>
            </div>
          );
        })}
      </ContentColumn>
      <ContentColumn>
        {[...Array(items)].map((i, index: number) => {
          return (
            <label className={"checkbox"} key={CreateId()}>
              <input
                type="checkbox"
                key={CreateId()}
                checked={false}
                onChange={() => null}
              />
              <span className="checkmark" key={CreateId()}></span>
              <label className="checkbox_label" key={CreateId()}>
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
