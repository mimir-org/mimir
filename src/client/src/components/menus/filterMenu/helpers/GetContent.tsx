import { CreateId } from "../../../flow/helpers";
import {
  MenuColumn,
  MenuSubHeader,
} from "../../../../componentLibrary/box/menus";

const GetContent = (items: number, section: number) => {
  // TODO: fix this mess when content for filter is known

  return (
    <div key={CreateId()}>
      <MenuColumn>
        {[...Array(items)].map((i, index: number) => {
          return (
            <div key={CreateId()}>
              {index === 0 && <MenuSubHeader>Test</MenuSubHeader>}
              <label className={"checkbox"} key={CreateId()}>
                <input
                  type="checkbox"
                  key={CreateId()}
                  checked={false}
                  onChange={() => null}
                />
                <span className="checkmark" key={CreateId()}></span>
                <label className="checkbox_label"></label>
                Test
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
                Test
              </label>
            </label>
          );
        })}
      </MenuColumn>
    </div>
  );
};

export default GetContent;
