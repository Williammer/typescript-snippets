function doMethod<T extends (...args: any[]) => any>(
  func: T,
  ...args: Parameters<T>
): ReturnType<T> {
  return func.call(this, ...args);
}

function sum(...inputs: number[]): number {
  return inputs.reduce((result: number, input: number) => {
    return result + input;
  }, 0);
}

const summed = doMethod(sum, 1, 2);
