import { ICON_TYPE, NODE_TYPE } from '../models/project';

export default class LibraryDataset {
  static getAll() {
    return new Promise((resolve) => {
      let dataset = [
        {
            id: 1,
            name: "Reservoir",
            label: null,
            icon: ICON_TYPE.FUNCTION_ICON,          
            type: NODE_TYPE.FUNCTION,
            connectors: [],
            category: ''
        },
        {
            id: 2,
            name: "Ocean",
            label: null,
            icon: ICON_TYPE.FUNCTION_ICON,          
            type: NODE_TYPE.FUNCTION,
            connectors: [],
            category: ''
        },
        {
            id: 3,
            name: "NOAKA",
            label: null,
            icon: ICON_TYPE.FUNCTION_ICON,          
            type: NODE_TYPE.FUNCTION,
            connectors: [],
            category: ''
        },
        {
            id: 4,
            name: "Motor f/Pump B",
            label: null,
            icon: ICON_TYPE.FUNCTION_ICON,          
            type: NODE_TYPE.FUNCTION,
            connectors: [],
            category: ''
        },
        {
            id: 5,
            name: "SQ Motor",
            label: "IC411 SQ Motor",
            icon: ICON_TYPE.PRODUCT_ICON,          
            type: NODE_TYPE.PRODUCT,
            connectors: [],
            category: ''
        },
        {
            id: 6,
            name: "Some location",
            label: null,
            icon: ICON_TYPE.LOCATION_ICON,          
            type: NODE_TYPE.LOCATION,
            connectors: [],
            category: ''
        },
        {
            id: 7,
            name: "Fulla",
            label: null,
            icon: ICON_TYPE.FUNCTION_ICON,          
            type: NODE_TYPE.FUNCTION,
            connectors: [],
            category: ''
        },
      ];

      setInterval(() => {
        resolve(dataset);
      }, 300);
    });
  }
}

