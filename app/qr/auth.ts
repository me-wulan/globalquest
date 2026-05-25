export const CREDENTIALS = {
  username: "guru",
  password: "globalquest2025",
};

export const AUTH_KEY = "gq_guru_auth";

export function isLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(AUTH_KEY) === "true";
}

export function login(username: string, password: string): boolean {
  if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
    localStorage.setItem(AUTH_KEY, "true");
    return true;
  }
  return false;
}

export function logout(): void {
  localStorage.removeItem(AUTH_KEY);
}