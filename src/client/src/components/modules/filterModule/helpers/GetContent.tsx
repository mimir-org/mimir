import { MenuColumn, MenuSubHeader } from "../../../../componentLibrary";
import { VisualFilterResources } from "../../../../textResources";
import { CreateId } from "../../../flow/helpers";

const GetContent = (items: number, section: number) => {
  let text = VisualFilterResources.slice(section + items * 2);

  // TODO: fix this mess when content for filter is known

  return (
    <div key={CreateId()}>
      <MenuColumn>
        {[...Array(items)].map((i, index: number) => {
          return (
            <div key={CreateId()}>
              {index === 0 && (
                <MenuSubHeader>{VisualFilterResources[section]}</MenuSubHeader>
              )}
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
      </MenuColumn>
      <MenuColumn>
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
      </MenuColumn>
    </div>
  );
};

export default GetContent;
