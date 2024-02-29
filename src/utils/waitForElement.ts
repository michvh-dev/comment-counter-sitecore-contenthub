const waitForElement = (
  selector: string,
  timeout = 5000
): Promise<HTMLElement> => {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const element = document.querySelector(selector);
      if (element) {
        clearInterval(interval);
        resolve(element as HTMLElement);
      } else if (Date.now() - startTime >= timeout) {
        clearInterval(interval);
        reject(
          new Error(`Timeout waiting for element with selector '${selector}'`)
        );
      }
    }, 100); // Check every 100 milliseconds
  });
};

export { waitForElement };
