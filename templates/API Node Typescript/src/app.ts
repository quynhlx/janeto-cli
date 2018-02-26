import Config from "./config";
import Server from "./server";
import Database from "./db";
import Repositories from "./db/repositories";
import Services from "./services";

import { IRouteConfig, IRepositories } from "./interfaces";
import { ErrorRequestHandler, headerMiddleware } from "./api/middlewares";

import { UserRoutes, AuthRoutes } from "./api";
import { Contrib } from "./contrib";

const bootstap = async () => {
  const config = await Config.bootstap();

  const contrib = new Contrib(config);

  const app = new Server(config);
  const db = new Database(config.DB);
  db.connect();

  const repositories = new Repositories();
  const services = new Services({repositories, contrib, config});

  const routeConfig: IRouteConfig = {
    services,
    contrib
  };

  app.addMiddleWare(headerMiddleware);

  app.addRoutes("/api/auth", AuthRoutes(routeConfig));
  app.addRoutes("/api/users", UserRoutes(routeConfig));

  app.addMiddleWare(ErrorRequestHandler(contrib.logger));

  return { app, logger: contrib.logger };
};

bootstap().then(({ app, logger }) => {
  app.listen();
  logger.info(`Server is listening on port ${app.options.port}`);
});
