import * as express from "express";
import * as helmet from "helmet";
import * as cors from "cors";
import * as session from "express-session";

export const configureMiddleware = (server: express.Express) => {
  server.use(helmet());
  server.use(express.json());
  server.use(cors());
  server.use(
    session({
      name: "sid",
      secret: "secret",
      cookie: {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        secure: false,
        httpOnly: false
      },
      resave: false,
      saveUninitialized: true
    })
  );
};
