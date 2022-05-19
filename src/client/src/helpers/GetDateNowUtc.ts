/**
 * Function to find datetime now in UTC timestamp
 * @returns a new date as UTC
 */
const GetDateNowUtc = () => {
  const currTimestamp = Date.now();
  const utcDateString = new Date(currTimestamp).toUTCString();
  return new Date(utcDateString);
};

export default GetDateNowUtc;
