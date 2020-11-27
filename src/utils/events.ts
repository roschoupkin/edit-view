export function handleEvent<T>(callback?: (...v: T[]) => void, ...values: T[]): void {
  if (callback) {
    callback(...values);
  }
}
