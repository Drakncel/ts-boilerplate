export const delay = async (ms: number = 500): Promise<void> =>
  new Promise<void>((resolve) =>
    setTimeout(() => {
      resolve();
    }, ms),
  );
