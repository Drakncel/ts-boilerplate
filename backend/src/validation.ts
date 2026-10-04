export const isValidHttpUrl = (string: string): boolean => {
  try {
    const url = new URL(string);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (_) {
    return false;
  }
};

export const isValidKey = (string: string): boolean => {
  const forbiddenPattern = /^(app|api)(.*)+$/;
  if (forbiddenPattern.test(string)) {
    return false;
  }

  const allowedPattern = /^[0-9A-Za-z-]+$/;
  return allowedPattern.test(string);
};
