export function readFixKey() {
  return localStorage.getItem("fix-key") || "";
}

export function writeFixKey(key: string) {
  localStorage.setItem("fix-key", key);
}
