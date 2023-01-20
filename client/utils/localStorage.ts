const LSTORAGE_ACCESS_TOKEN_KEY = "accessToken";
export function getTokenLStorage() {
  return localStorage.getItem(LSTORAGE_ACCESS_TOKEN_KEY);
}

export function setTokenLStorage(token: string) {
  return localStorage.setItem(LSTORAGE_ACCESS_TOKEN_KEY, token);
}
