export type Procedure = (...args: any[]) => void;

export default function debounce<F extends Procedure>(
  callback: F,
  delay = 50,
  isInstant?: boolean
): (this: ThisParameterType<F>, ...args: Parameters<F>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    const context = this;

    const executeLater = () => {
      timeoutId = undefined;
      if (!isInstant) {
        callback.apply(context, args);
      }
    };

    const shouldCallNow = isInstant && timeoutId === undefined;

    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(executeLater, delay);

    if (shouldCallNow) {
      callback.apply(context, args);
    }
  };
}
