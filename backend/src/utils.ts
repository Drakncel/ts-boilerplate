export const delay = async (ms: number = 500): Promise<void> =>
  new Promise<void>((resolve) =>
    setTimeout(() => {
      resolve();
    }, ms),
  );

export const randInt = (max: number): number => Math.floor(Math.random() * max);
