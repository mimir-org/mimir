import { InspectorPanel } from "@mimirorg/component-library";
import { useState } from "react";
import { AspectObject } from "../../../lib";
import { AdminTab } from "./tabs/AdminTab";
import { AttributeTab } from "./tabs/AttributeTab";

// InspectorHeaderProps & {
//   duration: number;
//   children: ReactNode;
//   isOpen: boolean;
//   isLocked: boolean;
//   onLock?: () => void;
//   onDelete?: () => void;
//   onTabChange?: (value: "admin" | "attribute" | "terminal" | "relation") => void;
//   icon?: string;
//   name?: string;
//   tabColor?: string;
//   selectedTab?: "admin" | "attribute" | "terminal" | "relation";
// };

/**
 * The mimir inspector module.
 * @returns a inspector component used to change and view aspect object data,
 * @param component props
 * and relations between the objects.
 */

interface InspectorModuleProps {
  selectedAspectObject: AspectObject | null;
}

export const InspectorModule = ({ selectedAspectObject }: InspectorModuleProps) => {
  // const theme = useMimirorgTheme();
  // const [expanded, setExpanded] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<"admin" | "attribute" | "terminal" | "relation">("relation");

  const onTabChange = (value: "admin" | "attribute" | "terminal" | "relation") => {
    setSelectedTab(value);
  };

  return (
    <div>
      <InspectorPanel
        duration={0.3}
        bgColor="#FFFAA9"
        onDelete={() => null}
        onLock={() => null}
        onTabChange={onTabChange}
        spacing={{ pl: "45px", pr: "45px" }}
        tabColor="#FFDE7A"
        name={selectedAspectObject?.name ?? "Please select an aspect object"}
        icon="http://localhost:5001/symbol/1cd2b7cc-0b27-415a-ad7b-3f16ab7c741d.svg"
        selectedTab={selectedTab}
      >
        {selectedTab === "admin" && selectedAspectObject && <AdminTab aspectObject={selectedAspectObject} />}
        {selectedTab === "attribute" && <AttributeTab attributes={selectedAspectObject?.attributes ?? []} />}
        {selectedTab === "terminal" && (
          <div style={{ padding: "10px" }}>
            <p>Here is some demo content</p>
            <p>Here is some demo content</p>
            <p>This is the terminal tab component</p>
            <p>This is the terminal tab component</p>
          </div>
        )}
        {selectedTab === "relation" && (
          <div style={{ padding: "10px" }}>
            <p>Here is some demo content</p>
            <p>Here is some demo content</p>
            <p>This is the relation tab component</p>
            <p>This is the relation tab component</p>
          </div>
        )}
      </InspectorPanel>
    </div>
  );
};

InspectorModule.displayName = "InspectorModule";
