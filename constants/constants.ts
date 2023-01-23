import { CookieOptions } from "express";

const dev = process.env.NODE_ENV === "development";
export const BACKEND_URL = dev ? "http://localhost:3000" : "COMPLETE AFTER";
export const BACKEND_URL_API = BACKEND_URL + "/api";

class BackendRouter {
  tasksControllerAPI = "/tasks.controller";
  GRAPHQL = "/graphql";
}
export const BACKEND_ROUTER = new BackendRouter();
class FrontendRouter {
  HOME = "/";
  LOGIN = "/login";
  REGISTER = "/register";
}
export const FRONTEND_ROUTER = new FrontendRouter();

export const JWT_SECRET = process.env.JWT_SECRET as string;
export const HEADER_ACCESS_TOKEN = "auth-token";
export const COOKIE_RT_KEY = "jwtRefreshToken";
export const COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  maxAge: 24 * 60 * 60 * 1000,
  sameSite: "none",
  secure: true,
};
export const EXPIRATION_TOKENS = {
  access: "10s",
  refresh: "1d",
  emailToken: "30m",
};
