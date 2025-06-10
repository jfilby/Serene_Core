export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function sleepSeconds(s: number) {
  return new Promise((resolve) => setTimeout(resolve, s * 1000));
}
