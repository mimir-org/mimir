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
  YES: "Yes",
  NO: "No",
  OK: "Ok",
  RELATIONS: "Relations",
  TERMINALS: "Terminals",
  PROJECT: "Project",
  LOGOUT: "Log out",
  TEMPLATES: "Templates",
  SUBPROJECTS: "Subprojects",

  // MODULES
  MODULE_LIBRARY: "Library",
  MODULE_INSPECTOR: "Inspector",

  // Relations
  RELATIONS_PARTOF_RELATIONSHIP: "Part of Relationship",
  RELATION_PARTOF: "Part of",
  RELATIONS_HASLOCATION: "Has Location",
  RELATIONS_HASFUNCTION: "Has Function",
  RELATIONS_FULFILLEDBY: "Fulfilled By",
  RELATIONS_TRANSPORT: "Transport",

  // Log in
  LOGIN_LABEL: "Log in",
  LOGIN_LABEL_EMAIL: "SSO e-mail",

  // Top-menu
  MAINHEADER_LOGIN_HEADING: "Login",
  MAINHEADER_VISUALFILTER: "Visual Filter",

  // Toolbar
  TOOLBAR_TREEVIEW: "Tree view",
  TOOLBAR_BLOCKVIEW: "Block view",
  TOOLBAR_ELECTRO_ON: "Toggle electromode on",
  TOOLBAR_ELECTRO_OFF: "Toggle electromode off",
  TOOLBAR_VISUALFILTERS_OPEN: "Open visual filters",
  TOOLBAR_VISUALFILTERS_CLOSE: "Close visual filters",
  TOOLBAR_FITSCREEN: "Fit to screen",

  // InspectorModule
  INSPECTOR_ADMININFO: "Admin",
  INSPECTOR_OBJECT: "Object",
  INSPECTOR_PARAMETERS: "Parameters",
  INSPECTOR_SIMPLETYPES: "Simple Types",

  INSPECTOR_RELATIONS_NAME: "Relation name",
  INSPECTOR_RELATIONS_UPDATED_BY: "Updated by",
  INSPECTOR_RELATIONS_CONNECTED_TO: "Connected to",
  INSPECTOR_RELATIONS_UPDATED_DATE: "Updated Date",
  INSPECTOR_RELATIONS_RELATION_OUT: "Relation out",
  INSPECTOR_RELATIONS_PART_LOCATION: "Part of Location",
  INSPECTOR_RELATIONS_LOCATION: "Go to location",
  INSPECTOR_RELATIONS_PRODUCT: "Go to product",
  INSPECTOR_RELATIONS_FUNCTION: "Go to function",
  INSPECTOR_RELATIONS_INPUT_OBJECT_CONNETION: "Input object connection",
  INSPECTOR_RELATIONS_OUTPUT_OBJECT_CONNETION: "Output object connection",
  INSPECTOR_RELATIONS_RELATIONSHIPS: "Active Relations",
  INSPECTOR_RELATIONS_ACTIVE_TERMINAL_TYPES: "Active Terminal Types",
  INSPECTOR_RELATIONS_TERMINAL_INPUT: "Terminal Input Object Connections",
  INSPECTOR_RELATIONS_TERMINAL_OUTPUT: "Terminal Output Object Connections",
  INSPECTOR_RELATIONS_TRANSPORT: "Connected Transports",
  INSPECTOR_RELATIONS_NODES: "Active Nodes",
  INSPECTOR_RELATIONS_ALL_TERMINAL_TYPES: "All available Terminal Types",
  INSPECTOR_RELATIONS_CONNECTOR_ATTRIBUTES: "Connector attributes",

  INSPECTOR_ADMIN_SEMANTIC_ID: "Semantic ID",
  INSPECTOR_ADMIN_RDS: "RDS",
  INSPECTOR_ADMIN_TAG: "Tag Number",
  INSPECTOR_ADMIN_DESIGNATION: "Reference Designation",
  INSPECTOR_ADMIN_SERVICE: "Service Description",
  INSPECTOR_ADMIN_CHANGE: "Change mode",
  INSPECTOR_ADMIN_VERSION: "Version",
  INSPECTOR_ADMIN_COST: "Cost: USD/NOK",
  INSPECTOR_ADMIN_KIND: "Kind",
  INSPECTOR_ADMIN_STATUS: "Status",
  INSPECTOR_ADMIN_DESCRIPTION: "Description",
  INSPECTOR_ADMIN_LONG_DESCRIPTION: "Long Description",
  INSPECTOR_ADMIN_INTERFACE: "Interface",
  INSPECTOR_ADMIN_UPDATED_BY: "Updated by",
  INSPECTOR_ADMIN_COLLABORATION_PARTNER: "Collaboration partner",
  INSPECTOR_ADMIN_UPDATED_DATE: "Last updated",
  INSPECTOR_ADMIN_CREATED_DATE: "Date created",
  INSPECTOR_ADMIN_LOCAL_DESCRIPTION: "Long Local Description",
  INSPECTOR_ADMIN_TYPE: "Type name",

  INSPECTOR_INHERITED_PRESSURE: "Saturation Pressure",
  INSPECTOR_INHERITED_TEMP: "Saturation Temperature",
  INSPECTOR_INHERITED_MAX_GAS: "Maximum gas processing capacity",
  INSPECTOR_INHERITED_MAX_OIL: "Maximum oil processing capacity",
  INSPECTOR_INHERITED_MAX_WATER: "Maximum produced water capacity",
  INSPECTOR_INHERITED_TOTAL_LIQUID: "Total liquid capacity",
  INSPECTOR_INHERITED_TOTAL_INJECTION: "Total injection water rate",

  INSPECTOR_EDGEADMIN_RELATION: "Relation Type",
  INSPECTOR_EDGEADMIN_TEMPLATE: "Template",
  INSPECTOR_EDGEADMIN_SOURCE: "Source Node",
  INSPECTOR_EDGEADMIN_TARGET: "Target Node",
  INSPECTOR_EDGEADMIN_PROJECT: "Master Project ID",

  INSPECTOR_DELETE_NODE: "Delete",
  INSPECTOR_FILTER: "Filter",
  INSPECTOR_LOCK: "Lock",
  INSPECTOR_UNLOCK: "Unlock",
  INSPECTOR_VALIDATE: "Validate",

  INSPECTOR_PARAMS_CLEAR_ALL: "Clear all Entities",
  INSPECTOR_PARAMS_DEFAULT: "Show all Entities",
  INSPECTOR_PARAMS_COMBINATION: "Select combinations",
  INSPECTOR_PARAMS_SELECT_ALL: "Select all",

  INSPECTOR_PARAMS_SEARCH: "Select Entity...",
  INSPECTOR_TERMINALS_SEARCH: "Search Terminal Type",
  INSPECTOR_SIMPLETYPES_SEARCH: "Search Simple Types",

  INSPECTOR_QUALIFIER: "Qualifier",
  INSPECTOR_SOURCE: "Source",
  INSPECTOR_CONDITION: "Condition",

  INSPECTOR_DELETE_OBJECT: "Delete object from drawing board",
  INSPECTOR_LOCK_OBJECT: "Lock object(s)",
  INSPECTOR_UNLOCK_OBJECT: "Unlock object(s)",
  INSPECTOR_RESIZE: "Click/drag to resize",
  INSPECTOR_EXPAND: "Expand inspector panel",
  INSPECTOR_CLOSE: "Close inspector panel",
  INSPECTOR_INACTIVE_PANEL: "Select an object to activate the inspector",

  // LibraryModule
  LIBRARY_COLLECTIONS: "Collections",
  LIBRARY_SEARCHBOX_PLACEHOLDER_LIBRARY: "Search Library for types...",
  LIBRARY_SEARCHBOX_PLACEHOLDER_TEMPLATES: "Search for Templates...",
  LIBRARY_SEARCHBOX_PLACEHOLDER_SUBPROJECTS: "Search for Subprojects...",
  LIBRARY_SEARCHFILTER_COLLECTIONS: "Search Collections",
  LIBRARY_SEARCHFILTER_LATEST_VERSION: "Only latest version",
  LIBRARY_SEARCHFILTER_OTHER: "Other search filter",
  LIBRARY_MANAGE_COLLECTIONS: "Add collections to work with Types",
  LIBRARY_SELECT_COLLECTIONS: "Select Collections to add to Library",
  LIBRARY_MANAGE_COLLECTIONS_BUTTON_ADD: "Add to Collections",
  LIBRARY_MANAGE_COLLECTIONS_BUTTON_MANAGE: "Manage Collections",
  LIBRARY_MANAGE_COLLECTIONS_UPDATE_LIBRARY: "Update Library",
  LIBRARY_SUBPROJECTS_INFO: "Subprojects created in Project menu appear listed here.",
  LIBRARY_SUBPROJECTS_NONE: "There are currently no Subprojects for this Project.",
  LIBRARY_TEMPLATES_NONE: "There are currently no Templates available for this Project.",
  LIBRARY_NEW_TYPE: "New Type",
  LIBRARY_EDIT_TYPE: "Edit Type",
  LIBRARY_DELETE_TYPE: "Delete Type",
  LIBRARY_DELETE_TYPE_CONFIRM: "Are you sure you want to delete ",
  LIBRARY_TYPE_VERSION: "v",
  LIBRARY_MODAL_CREATE_COLLECTION: "Create or add to existing Library Collection",
  LIBRARY_MODAL_SELECT_COLLECTION: "Or select existing collection",
  LIBRARY_MODAL_COLLECTION_CREATED: "Date created",
  LIBRARY_MODAL_ADD_COLLECTION: "Add",
  LIBRARY_ADD_FAVORITE: "Add to favorites",
  LIBRARY_REMOVE_FAVORITE: "Remove from favorites",
  LIBRARY_EXPAND_PANEL: "Expand library panel",
  LIBRARY_CLOSE_PANEL: "Close library panel",
  LIBRARY_ASPECT_TOGGLE: "Toggle",
  LIBRARY_ASPECT_FILTER_ON: "filter on",
  LIBRARY_ASPECT_FILTER_OFF: "filter off",
  LIBRARY_CATEGORY_RECENT: "Recently created",
  LIBRARY_CATEGORY_ALL: "Types",

  // ExplorerModule
  EXPLORER_LOCK_OBJECT: "Lock object(s)",
  EXPLORER_UNLOCK_OBJECT: "Unlock object(s)",
  EXPLORER_HIDE_OBJECT: "Hide object(s)",
  EXPLORER_SHOW_OBJECT: "Show object(s)",
  EXPLORER_OPEN_GROUP: "Open group",
  EXPLORER_CLOSE_GROUP: "Close group",
  EXPLORER_SELECT_OBJECT: "Select object(s)",
  EXPLORER_UNSELECT_OBJECT: "Unselect object(s)",
  EXPLORER_EXPAND_PANEL: "Expand explorer panel",
  EXPLORER_CLOSE_PANEL: "Close explorer panel",

  // ProjectMenu
  PROJECT_DESCRIPTION: "Project menu",
  PROJECT_HEADING: "Projects",
  PROJECT_CREATE: "Create project",
  PROJECT_SEARCH: "Search Projects",
  PROJECT_OPEN: "Open project",
  PROJECT_CLOSE: "Close project",
  PROJECT_RECENT: "Recent projects",
  PROJECT_OWNER: "Owner",
  PROJECT_VERSION: "Version",
  PROJECT_EDITED: "Last edited",

  PROJECT_OPEN_LABEL: "Open or start a new project",
  PROJECT_SAVE: "Save project",
  PROJECT_ABOUT: "About the project",
  PROJECT_DESC_NA: "No information currently available",
  PROJECT_LIB: "Libraries",

  PROJECT_IMPORT: "Import project",
  PROJECT_IMPORT_LIB_TYPES: "Import library types",
  PROJECT_IMPORT_LIB: "Import library",
  PROJECT_IMPORT_FILE: "File",
  PROJECT_IMPORT_SELECT: "Please select a file",
  PROJECT_BROWSE: "Browse",
  PROJECT_PARSER: "Select data type",

  PROJECT_EXPORT_FILE: "Export file",
  PROJECT_EXPORT: "Export project",
  PROJECT_EXPORT_LIBRARY: "Export library",
  PROJECT_EXPORT_LIBRARY_TYPES: "Export library types",

  PROJECT_COMMIT_PROJECT: "Commit project",
  PROJECT_COMMIT_PARTNER: "Send to collaboration partner",
  PROJECT_COMMIT_PARSER: "Data type",
  PROJECT_COMMIT: "Commit",

  PROJECT_START_LABEL: "Start a new project",
  PROJECT_SUBPROJECT_SAVE: "Save selection as subproject",
  PROJECT_NAME: "Project name",
  PROJECT_NAME_PLACEHOLDER: "New project name...",
  PROJECT_CONFIRM_SAVE: " Save this project before opening/starting another?",
  PROJECT_FILE_NAME: "File name",

  PROJECT_CLOSE_LABEL: "Please make sure you save before you close the project",
  PROJECT_SUBPROJECT: "Save subproject",
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
  BLOCK_OFFPAGE_NODE: "BlockOffPageNode",

  // RDS
  RDS_FUNCTION: "=",
  RDS_PRODUCT: "-",
  RDS_LOCATION: "+",

  // Visual Filter
  FILTER_HEADING: "Visual Filter",
  FILTER_SHOW_ALL: "Show all",
  FILTER_MATERIALFLUID: "Material Fluid",
  FILTER_ENERGYELECTRICAL: "Energy Electrical",
  FILTER_SHOW_TERMINALS: "Show all terminals",
  FILTER_SHOW_ACTIVE_TERMINALS: "Show all active terminals",
  FILTER_SHOW_INACTIVE_TERMINALS: "Show all inactive terminals",
  FILTER_SHOW_TRANSPORT: "Show all transport edges",
  FILTER_ANIMATION: "Transport animation",

  FILTER_PARTOF: "Part of relationship",
  FILTER_PARTOF_FUNCTION: "Show part of Function",
  FILTER_PARTOF_LOCATION: "Show part of Location",
  FILTER_PARTOF_PRODUCT: "Show part of Product",

  FILTER_TRANSPORTS: "Transports",
  FILTER_CATEGORY: "Category",

  // User Menu
  USERMENU_DESC: "User settings menu",
  USERMENU_SETTINGS: "User Settings",
  USERMENU_NOTIFICATION: "Show all Notifications",
  USERMENU_DARKMODE: "Turn on Dark mode",
  USERMENU_LIGHTMODE: "Turn on Light mode",
  USERMENU_USER: "User",

  // Fullscreen
  FULLSCREEN_OPEN: "Open all panels",
  FULLSCREEN_CLOSE: "Close all panels",

  // Validation
  VALIDATION_TERMINALS: "A connection can only be made between two terminals of the same type.",
  VALIDATION_ASPECT: "A relation connection can only be made between two nodes of the same Aspect.",
  VALIDATION_BLOCKVIEW: "Please select a node before opening Block View.",
  VALIDATION_BLOCKVIEW_MULTISELECT: "Please select only one node before opening Block View.",
  VALIDATION_BLOCKVIEW_PROJECT: "Please select a project before opening Block View.",
  VALIDATION_OFFPAGE: "An off-page node can only be connected with a node of the same type.",
  VALIDATION_CONNECTION: "A terminal can only have one connection.",
  VALIDATION_RELATIONS_CONNECTORS: "A connection between these nodes already exists.",

  // Modal
  MODAL_CLOSE: "Close menu",

  // Resize
  RESIZE_NODE: "Resize node",
};
