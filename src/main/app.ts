import express from "express";
import swaggerUi from "swagger-ui-express";

import { makeDependencies } from "./container.js";
import { createRoutes } from "./routes.js";
import { swaggerSpec } from "./swagger.js";

export const createApp = () => {
  const app = express();
  const dependencies = makeDependencies();

  app.use(express.json());
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use(createRoutes(dependencies));

  return app;
};
