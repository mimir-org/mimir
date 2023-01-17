/**
 * Component for all static text in Mimir.
 */
export const TextResources = {
  // COMMON
  ID: "ID",
  CREATE: "Create",
  SAVE: "Save",
  OPEN: "Open",
  CANCEL: "Cancel",
  DELETE: "Delete",
  YES: "Yes",
  NO: "No",
  OK: "Ok",
  VALIDATE: "Validate",
  BROWSE: "Browse",
  COMMIT: "Commit",
  TOGGLE: "Toggle",
  RELATIONS: "Relations",
  TERMINALS: "Terminals",
  PROJECT: "Project",
  VISUAL_FILTER: "Visual Filter",
  TEMPLATES: "Templates",
  SUBPROJECTS: "Subprojects",
  LOCK_OBJECT: "Lock object(s)",
  UNLOCK_OBJECT: "Unlock object(s)",
  PARTOF_RELATIONSHIP: "PartOf",
  FAVORITES: "Favorites",
  CLOSE_WINDOW: "Close window",

  // MODULES
  LIBRARY: "Library",
  INSPECTOR: "Inspector",

  // Relations
  PARTOF: "Part of",
  HAS_LOCATION: "Has Location",
  HAS_FUNCTION: "Has Function",
  FULFILLED_BY: "Fulfilled By",
  TRANSPORT: "Transport",

  // Log in
  LOGIN_HEADING: "Login",
  LOGIN: "Log in",
  LOGOUT: "Log out",

  // Toolbar
  TREEVIEW: "Tree view",
  BLOCKVIEW: "Block view",
  ELECTRO_ON: "Toggle electromode on",
  ELECTRO_OFF: "Toggle electromode off",
  VISUALFILTER_OPEN: "Open visual filter",
  VISUALFILTER_CLOSE: "Close visual filter",
  FITSCREEN: "Fit to screen",

  // InspectorModule
  ADMIN_INFO: "Admin",
  OBJECT: "Object",
  ATTRIBUTES: "Attributes",
  TERMINAL_ATTRIBUTES: "Terminal Attributes",
  RELATIONS_NAME: "Relation name",
  RELATIONS_UPDATED_BY: "Updated by",
  RELATIONS_CONNECTED_TO: "Connected to",
  RELATIONS_UPDATED_DATE: "Updated Date",
  RELATIONS_RELATION_OUT: "Relation out",
  RELATIONS_PART_LOCATION: "Part of Location",
  RELATIONS_LOCATION: "Go to location",
  RELATIONS_PRODUCT: "Go to product",
  RELATIONS_FUNCTION: "Go to function",
  RELATIONS_INPUT_OBJECT_CONNETION: "Input object connection",
  RELATIONS_OUTPUT_OBJECT_CONNETION: "Output object connection",
  RELATIONS_RELATIONSHIPS: "Active Relations",
  RELATIONS_ACTIVE_TERMINAL_TYPES: "Active Terminal Types",
  RELATIONS_TERMINAL_INPUT: "Terminal Input Object Connections",
  RELATIONS_TERMINAL_OUTPUT: "Terminal Output Object Connections",
  RELATIONS_TRANSPORT: "Connected Transports",
  RELATIONS_NODES: "Active Nodes",
  RELATIONS_ALL_TERMINAL_TYPES: "All available Terminal Types",
  RELATIONS_CONNECTOR_ATTRIBUTES: "Connector attributes",

  ADMIN_SEMANTIC_ID: "Semantic ID",
  ADMIN_RDS: "RDS",
  ADMIN_TAG: "Tag Number",
  ADMIN_DESIGNATION: "Reference Designation",
  ADMIN_SERVICE: "Service Description",
  ADMIN_CHANGE: "Change mode",
  ADMIN_VERSION: "Version",
  ADMIN_COST: "Cost: USD/NOK",
  ADMIN_KIND: "Kind",
  ADMIN_DESCRIPTION: "Description",
  ADMIN_LONG_DESCRIPTION: "Long Description",
  ADMIN_INTERFACE: "Interface",
  ADMIN_UPDATED_BY: "Updated by",
  ADMIN_PARTNER: "Collaboration partner",
  ADMIN_UPDATED_DATE: "Last updated",
  ADMIN_CREATED_DATE: "Date created",
  ADMIN_LOCAL_DESCRIPTION: "Long Local Description",
  ADMIN_TYPE: "Type name",

  INHERITED_PRESSURE: "Saturation Pressure",
  INHERITED_TEMP: "Saturation Temperature",
  INHERITED_MAX_GAS: "Maximum gas processing capacity",
  INHERITED_MAX_OIL: "Maximum oil processing capacity",
  INHERITED_MAX_WATER: "Maximum produced water capacity",
  INHERITED_TOTAL_LIQUID: "Total liquid capacity",
  INHERITED_TOTAL_INJECTION: "Total injection water rate",

  EDGEADMIN_RELATION: "Relation Type",
  EDGEADMIN_TEMPLATE: "Template",
  EDGEADMIN_SOURCE: "Source Node",
  EDGEADMIN_TARGET: "Target Node",
  EDGEADMIN_PROJECT: "Master Project ID",

  INSPECTOR_FILTER: "Filter",
  INSPECTOR_LOCK: "Lock",
  INSPECTOR_UNLOCK: "Unlock",

  PARAMS_CLEAR_ALL: "Clear all Entities",
  PARAMS_DEFAULT: "Show all Entities",
  PARAMS_COMBINATION: "Select combinations",
  PARAMS_SELECT_ALL: "Select all",
  PARAMS_SEARCH: "Select Entity...",
  PARAMS_CLOSE: "Close parameter",
  PARAMS_LOCK: "Lock parameter",
  PARAMS_UNLOCK: "Unlock parameter",
  TERMINALS_SEARCH: "Search Terminal Type",

  SPECIFIED_SCOPE: "Qty. Datum w/Spec. Scope",
  SPECIFIED_PROVENANCE: "Qty. Datum w/Spec. Provenance",
  RANGE_SPECIFYING: "Range Specifying Qty. Datum",
  REGULARITY_SPECIFIED: "Regularity Specified Qty. Datum",

  DELETE_OBJECT: "Delete object from drawing board",
  RESIZE: "Click/drag to resize",
  EXPAND: "Expand inspector panel",
  CLOSE: "Close inspector panel",
  INACTIVE_PANEL: "Select an object to activate the inspector",
  INPUT_PLACEHOLDER: "input-placeholder",

  // LibraryModule
  COLLECTIONS: "Collections",
  SEARCHBOX_LIB: "Search Library for types...",
  SEARCHBOX_TEMPLATES: "Search for Templates...",
  SEARCHBOX_SUBPROJECTS: "Search for Subprojects...",
  SEARCHFILTER_COLLECTIONS: "Search Collections",
  SEARCHFILTER_LATEST_VERSION: "Only latest version",
  SEARCHFILTER_OTHER: "Other search filter",
  MANAGE_COLLECTIONS: "Add collections to work with Types",
  SELECT_COLLECTIONS: "Select Collections to add to Library",
  MANAGE_COLLECTIONS_ADD: "Add to Collections",
  MANAGE_COLLECTIONS_BUTTON: "Manage Collections",
  MANAGE_COLLECTIONS_UPDATE: "Update Library",
  SUBPROJECTS_INFO: "Subprojects created in project menu appear listed here.",
  SUBPROJECTS_NONE: "There are currently no subprojects.",
  TEMPLATES_NONE: "There are currently no Templates available for this Project.",
  TYPE_VERSION: "v",
  CREATE_COLLECTION: "Create or add to existing Library Collection",
  SELECT_COLLECTION: "Or select existing collection",
  COLLECTION_CREATED: "Date created",
  ADD_COLLECTION: "Add",
  ADD_FAVORITE: "Add to favorites",
  REMOVE_FAVORITE: "Remove from favorites",
  EXPAND_LIB_PANEL: "Expand library panel",
  CLOSE_LIB_PANEL: "Close library panel",
  ASPECT_FILTER_ON: "filter on",
  ASPECT_FILTER_OFF: "filter off",
  CATEGORY_RECENT: "Recently created",
  CATEGORY_ALL: "Types",

  // ExplorerModule
  HIDE_OBJECT: "Hide object(s)",
  SHOW_OBJECT: "Show object(s)",
  OPEN_GROUP: "Open group",
  CLOSE_GROUP: "Close group",
  SELECT_OBJECT: "Select object(s)",
  UNSELECT_OBJECT: "Unselect object(s)",
  EXPAND_PANEL: "Expand explorer panel",
  CLOSE_PANEL: "Close explorer panel",

  // ProjectMenu
  PROJECT_DESCRIPTION: "Project menu",
  PROJECT_HEADING: "Projects",
  PROJECT_CREATE: "Create project",
  PROJECT_SEARCH: "Search Projects",
  PROJECT_OPEN: "Open project",
  PROJECT_CLOSE: "Close project",
  PROJECT_RECENT: "Recent projects",
  OWNER: "Owner",
  VERSION: "Version",
  EDITED: "Last edited",

  PROJECT_OPEN_LABEL: "Open or start a new project",
  PROJECT_SAVE: "Save project",
  PROJECT_ABOUT: "About the project",
  PROJECT_NA: "No information currently available",
  PROJECT_LIB: "Libraries",

  PROJECT_IMPORT: "Import project",
  PROJECT_IMPORT_LIB: "Import library",
  PROJECT_IMPORT_FILE: "File",
  PROJECT_IMPORT_SELECT: "Please select a file",
  PROJECT_PARSER: "Select data type",

  PROJECT_EXPORT_FILE: "Export file",
  PROJECT_EXPORT: "Export project",
  PROJECT_EXPORT_LIBRARY: "Export library",

  COMMIT_PROJECT: "Commit project",
  PARTNER: "Send to collaboration partner",
  COMMIT_PARSER: "Data type",

  START_LABEL: "Start a new project",
  SUBPROJECT_SAVE: "Save selection as subproject",
  PROJECT_NAME: "Project name",
  PROJECT_NAME_NEW: "New project name...",
  CONFIRM_SAVE: " Save this project before opening/starting another?",
  FILE_NAME: "File name",

  MAKE_AVAILABLE_SUBPROJECT: "Available as subproject",
  MAKE_DISABLE_SUBPROJECT: "Disable as subproject",
  MAKE_DISABLE_SUBPROJECT_DESCRIPTION:
    "If the project is a sub-project, you can merge this project into another project. \nAre you sure that you want to convert this project?",

  SAVE_SUBPROJECT: "Save subproject",
  PROJECT_CLOSE_LABEL: "Please make sure you save before you close the project.",
  PROJECT_MENU_SELECT: "Please select an option from the project menu to continue using Mímir",

  // Error
  ERROR_GENERIC: "Something went wrong",
  ERROR_EXPORT_PROJECT: "Can not export a project that does not exist",
  ERROR_GETFILEDATA: "Could not create nodes and edges from file",
  ERROR_SAVE_UPDATE_PROJECT: "Could not create or update project",
  ERROR_SERVER_UNAVAILABLE: "The server is unavailable",
  ERROR_NOACCOUNT: "No active account. Verify a user has been signed in and setActiveAccount has been called",
  ERROR_FORBIDDEN: "Access denied",
  ERROR_SERVER: "Internal server error",

  // Type
  BLOCK_LOCATION: "BlockLocationNode",
  BLOCK_FUNCTION: "BlockFunctionNode",
  BLOCK_PRODUCT: "BlockProductNode",
  BLOCK_PARENTNODE: "BlockParentNode",

  // RDS
  RDS_FUNCTION: "=",
  RDS_PRODUCT: "-",
  RDS_LOCATION: "+",

  // Visual Filter
  SHOW_ALL: "Show all",
  MATERIALFLUID: "Material Fluid",
  ENERGYELECTRICAL: "Energy Electrical",
  SHOW_TERMINALS: "Show all terminals",
  SHOW_ACTIVE_TERMINALS: "Show all active terminals",
  SHOW_INACTIVE_TERMINALS: "Show all inactive terminals",
  SHOW_TRANSPORT: "Show all transport edges",
  ANIMATION: "Transport animation",
  TRANSPORTS: "Transports",
  CATEGORY: "Category",
  FILTER_PARTOF_FUNCTION: "Show part of Function",
  FILTER_PARTOF_LOCATION: "Show part of Location",
  FILTER_PARTOF_PRODUCT: "Show part of Product",

  // User Menu
  USERMENU: "User settings menu",
  SETTINGS: "User Settings",
  NOTIFICATION: "Show all Notifications",
  DARK_MODE: "Turn on Dark mode",
  LIGHT_MODE: "Turn on Light mode",
  USER: "User",

  // Fullscreen
  FULLSCREEN_OPEN: "Open all panels",
  FULLSCREEN_CLOSE: "Close all panels",

  // Validation
  VALIDATION_TERMINALS: "A connection can only be made between two terminals of the same type.",
  VALIDATION_ASPECT: "A relation connection can only be made between two nodes of the same Aspect.",
  VALIDATION_BLOCKVIEW: "Please select a node before opening Block View.",
  VALIDATION_BLOCKVIEW_MULTISELECT: "Please select only one node before opening Block View.",
  VALIDATION_BLOCKVIEW_PROJECT: "Please select a project before opening Block View.",
  VALIDATION_CONNECTION: "A terminal can only have one connection.",
  VALIDATION_RELATIONS_CONNECTORS: "A connection between these nodes already exists.",
  VALIDATION_TRANSPORT_INTERFACE: "There is no transport type or interface type connected to this terminal type.",
  VALIDATION_IMPOSSIBLE_CONNECTION: "It is not possible to create the connection.",
  VALIDATION_DIRECTION: "A connection must be from an output connector to a input connector",

  // Modal
  MODAL_CLOSE: "Close menu",

  // Resize
  RESIZE_NODE: "Resize node",

  // Kind
  KIND_NODE: "Node",
  KIND_EDGE: "Edge",
  KIND_TRANSPORT: "Transport",
  KIND_INTERFACE: "Interface",
  KIND_TERMINAL: "Terminal",
  KIND_RELATION: "Relation",
  KIND_CONNECTOR: "Connector",
  KIND_ATTRIBUTE: "Attribute",
  KIND_UNIT: "Unit",

  // Company names
  EQUINOR: "equinor.com",
  AIBEL: "aibel.com",
};
