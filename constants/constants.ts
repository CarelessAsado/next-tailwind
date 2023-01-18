const dev = process.env.NODE_ENV === "development";
export const BACKEND_URL = dev ? "http://localhost:3000" : "COMPLETE AFTER";

export const BACKEND_URL_API = BACKEND_URL + "/api";

class BackendRouter {
  tasksControllerAPI = "/tasks.controller";
  GRAPHQL = "/graphql";
}
export const BACKEND_ROUTER = new BackendRouter();
class FrontendRouter {
  LOGIN = "/login";
}
export const FRONTEND_ROUTER = new FrontendRouter();
