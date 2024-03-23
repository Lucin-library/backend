import userRoute from "../api/user/user.route.js";

const initRoute = (app) => {
  app.use("/v1/api/user", userRoute);
};
export default initRoute;
