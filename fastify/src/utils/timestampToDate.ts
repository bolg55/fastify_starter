export const timestampToDate = (timestamp: number) => {
  if (!timestamp) {
    return null;
  }
  return new Date(timestamp * 1000);
};
