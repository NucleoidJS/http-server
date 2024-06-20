import express from "express";
import morgan from "morgan";

function serve(folderName) {
  const path = require("path");
  const { pathToFileURL, fileURLToPath } = require("url");
  const configPath = pathToFileURL(path.resolve(process.cwd()));

  const app = express();
  app.set("strict routing", true);
  app.use(morgan("tiny"));

  import(`${configPath}/config.js`).then((module) => {
    const config = module.default;

    app.use(
      config.base || "/",
      express.static(path.join(fileURLToPath(configPath), folderName)),
    );

    app.get("*", (req, res) => {
      res.sendFile(
        path.join(fileURLToPath(configPath), folderName, "index.html"),
      );
    });

    const port = process.env.PORT || config.port || 3000;

    let message = `Server running on port ${port}`;
    config.base && (message += ` with base ${config.base}`);

    app.listen(port, () => {
      console.log(`\x1b[36m%s\x1b[0m`, message);
    });
  });
}

export { serve };
