import userRoute from "../api/user/user.route.js";
import authRouter from "../api/auth/auth.router.js";
import authorRouter from "../api/author/author.router.js";
import bookRouter from "../api/book/book.router.js";
import discussionRouter from "../api/discussion/discussion.router.js";

const initRoute = (app) => {
  app.use("/v1/api/user", userRoute);
  app.use("/v1/api/auth", authRouter);
  app.use("/v1/api/author", authorRouter);
  app.use("/v1/api/book", bookRouter);
  app.use("/v1/api/discussion", discussionRouter);
};
export default initRoute;
