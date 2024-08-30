export const checkIsValidRegex = (regex: string) => {
  try {
    const regExp = new RegExp(regex);
    return Boolean(regExp);
  } catch {
    return false;
  }
};
