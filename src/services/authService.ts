import { environment } from "../config/environment";
import type { LoginRequest, LoginResponse } from "../types/auth";

export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status = 0) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function loginUser(
  credentials: LoginRequest,
  signal?: AbortSignal,
): Promise<LoginResponse> {
  let response: Response;

  try {
    response = await fetch(
      `${environment.apiBaseUrl}${environment.loginEndpoint}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(credentials),
        signal,
      },
    );
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw error;
    }

    throw new ApiError(
      "Unable to connect to the server. Please try again.",
    );
  }

  const contentType = response.headers.get("content-type") ?? "";
  const body = contentType.includes("application/json")
    ? await response.json().catch(() => null)
    : null;

  if (!response.ok) {
    const message =
      typeof body?.message === "string"
        ? body.message
        : response.status >= 500
          ? "The server is temporarily unavailable. Please try again."
          : "Invalid email or password.";

    throw new ApiError(message, response.status);
  }

  return body ?? { success: true };
}