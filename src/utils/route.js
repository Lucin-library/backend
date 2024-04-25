import userRoute from "../api/user/user.route.js";
import authRouter from "../api/auth/auth.router.js";
import bookRouter from "../api/book/book.router.js";

const initRoute = (app) => {
  app.use("/v1/api/user", userRoute);
  app.use("/v1/api/auth", authRouter);
  app.use("/v1/api/book", bookRouter);
};
export default initRoute;
