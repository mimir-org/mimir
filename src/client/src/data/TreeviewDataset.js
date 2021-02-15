export default class TreeviewDataset {
    static getAll() {
        return new Promise(resolve => {
            let dataset = [                
                {
                    id: "1001",
                    name: "Krafla",
                    nodes: [
                        {
                            id: "1002",
                            name: "XXX",
                            nodes: [
                                
                            ]
                        },
                        {
                            id: "1003",
                            name: "YYY",
                            nodes: [
                                
                            ]
                        },
                        {
                            id: "1004",
                            name: "ZZZ",
                            nodes: [
                                {
                                    id: "10041",
                                    name: "ZZZ_41",
                                    nodes: [
                                        
                                    ]
                                } 
                            ]
                        } 
                    ]
                } 
            ];

            setInterval(() => {
                resolve(dataset);
            }, 1000)
        })
    }
}