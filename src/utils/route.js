import userRoute from "../api/user/user.route.js";
import authRouter from "../api/auth/auth.router.js";
import authorRouter from "../api/author/author.router.js";
import bookRouter from "../api/book/book.router.js";
import discussionRouter from "../api/discussion/discussion.router.js";
import bookmarkRouter from "../api/bookmark/bookmark.router.js";
import favoriteRouter from "../api/favorite/favorite.router.js";
import ratingRouter from "../api/rating/rating.router.js";

const initRoute = (app) => {
  app.use("/v1/api/user", userRoute);
  app.use("/v1/api/auth", authRouter);
  app.use("/v1/api/author", authorRouter);
  app.use("/v1/api/book", bookRouter);
  app.use("/v1/api/discussion", discussionRouter);
  app.use("/v1/api/bookmark", bookmarkRouter);
  app.use("/v1/api/favorite", favoriteRouter);
  app.use("/v1/api/rating", ratingRouter);
};
export default initRoute;
