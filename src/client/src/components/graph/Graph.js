import Diagram, { createSchema, useSchema } from 'beautiful-react-diagrams';

const initialSchema = createSchema({
    nodes: [
      { id: 'node-1', content: 'NOAKA system', coordinates: [250, 120], outputs: [{ id: 'port-1', alignment: 'right' }] },
      { id: 'node-2', content: 'Gas processing system', coordinates: [800, 240], inputs: [{ id: 'custom-port-1',  alignment: 'left' }] },
      { id: 'node-3', content: 'Power plant system (Kollsnes terminal)', coordinates: [800, 120], inputs: [{ id: 'custom-port-3',  alignment: 'left' }] },
      { id: 'node-4', content: 'Oil processing system', coordinates: [450, 260], inputs: [{ id: 'custom-port-2',  alignment: 'left' }] },
    ],
    links: [
      { output: 'port-1', input: 'custom-port-2' },
    //   { input: 'node-1',  output: 'node-3' },
    //   { input: 'node-1',  output: 'node-4' },
    ]
  });
  
  const Graph = () => {
    
    const [schema, { onChange }] = useSchema(initialSchema);
  
    return (
      <div style={{ height: '50rem' }}>
        <Diagram schema={schema} onChange={onChange} />
      </div>
    );
  };

  export default Graph;
