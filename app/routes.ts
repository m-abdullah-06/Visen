import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/landing.tsx"),
  route("/dashboard", "routes/home.tsx"),
  route("/auth", "routes/auth.tsx"),
  route("/upload", "routes/upload.tsx"),
  route("/resume/:id", "routes/resume.tsx"),
  route("/wipe", "routes/wipe.tsx"),
  route("/interview-prep", "routes/InterviewPrep-Standalone.tsx"),
  route("/interview-prep/session/:id", "routes/InterviewSession.tsx"),
  route("/privacy", "routes/privacy.tsx"),
] satisfies RouteConfig;
