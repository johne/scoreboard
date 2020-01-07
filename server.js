const Path = require("path");
const Hapi = require("@hapi/hapi");
const Inert = require("@hapi/inert");
const Nes = require("@hapi/nes");
const GameManager = require("./src/GameManager");
const routes = require("./src/routes");

const server = new Hapi.Server({
  port: 3001,
  routes: {
    cors: {
      origin: ["*"]
    },
    files: {
      relativeTo: Path.join(__dirname, "ui/scoreboard/build")
    }
  }
});

const provision = async () => {
  await server.register(Inert);
  await server.register(Nes);

  const gameManager = new GameManager(server);

  server.route(routes);

  server.route({
    method: "GET",
    path: "/history",
    config: {
      id: "history",
      handler: request => {
        console.log(request);
        return gameManager.history().then(res => JSON.stringify(res));
      }
    }
  });

  server.route({
    method: "GET",
    path: "/{param*}",
    handler: {
      directory: {
        path: ".",
        redirectToSlash: false,
        index: true
      }
    }
  });

  server.route({
    method: "POST",
    path: "/update",
    config: {
      id: "update",
      handler: (request, h) => {
        console.log(request);
        gameManager.handleMessage(request.payload);
        return "received";
      }
    }
  });

  await server.start();

  console.log("Server running at:", server.info.uri);
};

provision();
