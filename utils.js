const sleep = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

const centerText = (text, width = process.stdout.columns || 80) =>
  text
    .split("\n")
    .map((line) => line.padStart(Math.floor((width + line.length) / 2)))
    .join("\n");

const Margin = () => {
  return {
    top: (size = 1) => "\n".repeat(size),
    bottom: (size = 1) => "\n".repeat(size),
  };
};

export { sleep, centerText, Margin };
