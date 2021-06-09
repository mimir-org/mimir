const GetConnectorName = (conn) => {
  return conn.name + " (" + conn.type + ")";
};

export default GetConnectorName;
