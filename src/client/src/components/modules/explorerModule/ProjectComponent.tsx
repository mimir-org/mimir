import { AspectComponent } from "./aspectComponent/AspectComponent";
import { IsAspectNode } from "../../flow/helpers";
import store from "../../../redux/store";
import { NODE_TYPE, VIEW_TYPE } from "../../../models/project";
import { CheckView } from "../../../redux/store/localStorage";

export const ProjectComponent = () => {
  const project = store.getState().projectState.project;
  const aspects = project?.nodes ?? [];
  const isBlockView = CheckView(VIEW_TYPE.BLOCKVIEW);

  return (
    <>
      {!isBlockView
        ? aspects.map((obj: object, i: number) => {
            if (IsAspectNode(aspects[i].type)) {
              return (
                <AspectComponent
                  key={i}
                  nodeId={obj["id"]}
                  label={obj["label"]}
                  aspectType={obj["type"]}
                />
              );
            }
            return null;
          })
        : aspects.map((obj: object, i: number) => {
            if (
              IsAspectNode(aspects[i].type) &&
              aspects[i].type !== NODE_TYPE.ASPECT_PRODUCT
            ) {
              return (
                <AspectComponent
                  key={i}
                  nodeId={obj["id"]}
                  label={obj["label"]}
                  aspectType={obj["type"]}
                />
              );
            }
            return null;
          })}
    </>
  );
};

export default ProjectComponent;
