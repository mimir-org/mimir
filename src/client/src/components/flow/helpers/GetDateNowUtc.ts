/**
 * Function to find a node's childNode
 * @returns a new date as UTC
 */

// TODO: this is used to traverse down one step in BlockView. How to find the correct child node will be defined later.
const GetDateNowUtc = (): Date => {
  const currTimestamp = Date.now();
  const utcDateString = (new Date(currTimestamp)).toUTCString();
  return new Date(utcDateString);
};

export default GetDateNowUtc;