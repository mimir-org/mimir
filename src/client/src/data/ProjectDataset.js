export default class ProjectDataset {
    static get(id) {
      return new Promise((resolve) => {
        let project =
          {
            id: 1,
            name: "Noaka",
            description: "Noaka description",
            function: {
                name: "Function",
                children: []
            },
            product: {
                name: "Product",
                children: []
            },
            location: {
                name: "Location",
                children: []
            }
          };        
  
        setInterval(() => {
          resolve(project);
        }, 500);
      });
    }
  }
  