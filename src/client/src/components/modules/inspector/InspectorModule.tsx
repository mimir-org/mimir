import { InspectorPanel, useMimirorgTheme } from "@mimirorg/component-library";
import { useState } from "react";

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
export const InspectorModule = () => {
  const theme = useMimirorgTheme();
  const [expanded, setExpanded] = useState<boolean>(false);
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
        name="Pump"
        icon="http://localhost:5001/symbol/1cd2b7cc-0b27-415a-ad7b-3f16ab7c741d.svg"
        selectedTab={selectedTab}
      >
        {selectedTab === "admin" && (
          <div style={{ padding: "10px" }}>
            <p>Here is some demo content</p>
            <p>Here is some demo content</p>
            <p>This is the admin tab component</p>
            <p>Here is some demo content</p>
            <p>Here is some demo content</p>
            <p>This is the admin tab component</p>
            <p>Here is some demo content</p>
            <p>Here is some demo content</p>
            <p>This is the admin tab component</p>
          </div>
        )}
        {selectedTab === "attribute" && (
          <div style={{ padding: "10px" }}>
            <p>Here is some demo content</p>
            <p>Here is some demo content</p>
            <p>This is the attribute tab component</p>
          </div>
        )}
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
