
const IsSubProject = (event: any) => {
  const data = JSON.parse(event.dataTransfer.getData("application/reactflow"));
  return !data.hasOwnProperty("aspect")
};

export default IsSubProject;