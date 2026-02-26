import { getNewAccessToken } from "@/services/auth/auth.service";
import { deleteCookie, getCookie } from "@/services/auth/token-handlers";

const BACKEND_API_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api/v1";

// /auth/login
const serverFetchHelper = async (
  endpoint: string,
  options: RequestInit,
): Promise<Response> => {
  const { headers, ...restOptions } = options;
  const accessToken = await getCookie("accessToken");

  //to stop recursion loop
  if (endpoint !== "/auth/refresh-token") {
    await getNewAccessToken();
  }

  const response = await fetch(`${BACKEND_API_URL}${endpoint}`, {
    headers: {
      Cookie: accessToken ? `accessToken=${accessToken}` : "",
      ...headers,
      // ...(accessToken ? { "Authorization": `Bearer ${accessToken}` } : {}),
      // ...(accessToken ? { "Authorization": accessToken } : {}),
    },
    ...restOptions,
  });

  // 4️⃣ Professional: Handle 401 Unauthorized globally
  if (response.status === 401) {
    // Optional: clear cookies if needed
    await deleteCookie("accessToken");
    await deleteCookie("refreshToken");
    // throw new Error("UNAUTHORIZED_401");
  }

  return response;
};

export const serverFetch = {
  get: async (endpoint: string, options: RequestInit = {}): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "GET" }),

  post: async (
    endpoint: string,
    options: RequestInit = {},
  ): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "POST" }),

  put: async (endpoint: string, options: RequestInit = {}): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "PUT" }),

  patch: async (
    endpoint: string,
    options: RequestInit = {},
  ): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "PATCH" }),

  delete: async (
    endpoint: string,
    options: RequestInit = {},
  ): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "DELETE" }),
};
