export default class WorkspaceDataset {
    static getAll() {
        return new Promise(resolve => {
            let dataset = [
                {
                    id: 1,
                    name: "jsv",                    
                    nodes: [
                        { id: "node-1", name: "NOAKA system", x: 100, y: 150, ports: [{ name: "Out", type: 1 }], nodeType: { id: 1, name: "Out node type", color:"rgb(0,192,255)" } },
                        { id: "node-2", name: "Gas processing system", x: 300, y: 50, ports: [{ name: "In", type: 0 }], nodeType: { id: 1, name: "Out node type", color:"rgb(192,255,0)" } },
                        { id: "node-3", name: "Power plant system (Kollsnes terminal)", x: 300, y: 150, ports: [{ name: "In", type: 0 }], nodeType: { id: 1, name: "Out node type", color:"rgb(192,255,0)" } },
                        { id: "node-4", name: "Oil processing system", x: 300, y: 300, ports: [{ name: "In", type: 0 }],nodeType: { id: 1, name: "Out node type", color:"rgb(192,255,0)" } },
                    ]
                }
            ];

            setInterval(() => {
                resolve(dataset);
            }, 2000)
        })
    }
}
