module.exports = {
    init(app){
      const staticRoutes = require("../routes/static");
      const topicRoutes = require("../routes/topics");
      const advRoutes = require("../routes/advertisements");
      const postRoutes = require("../routes/posts");


      app.use(staticRoutes);
      app.use(topicRoutes);
      app.use(advRoutes);
      app.use(postRoutes);

    }
  }