export const isJsonString = (str: string) => {
  try {
    JSON.parse(str);
  } catch (e: unknown) {
    return false;
  }
  return true;
}