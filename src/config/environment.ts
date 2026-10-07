const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.trim() || "http://localhost:8080";

const LOGIN_ENDPOINT =
  import.meta.env.VITE_LOGIN_ENDPOINT?.trim() || "/api/auth/login";

export const environment = {
  apiBaseUrl: API_BASE_URL.replace(/\/$/, ""),
  loginEndpoint: LOGIN_ENDPOINT.startsWith("/")
    ? LOGIN_ENDPOINT
    : `/${LOGIN_ENDPOINT}`,
};