export function getSrc(path) {
    return new URL(`../assets/${path}`, import.meta.url).href;
  }