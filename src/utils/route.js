import userRoute from "../api/user/user.route.js";
import authRouter from "../api/auth/auth.router.js";

const initRoute = (app) => {
  app.use("/v1/api/user", userRoute);
  app.use("/v1/api/auth", authRouter);
};
export default initRoute;
