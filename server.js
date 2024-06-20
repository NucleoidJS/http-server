const express = require("express");
const morgan = require("morgan");
const path = require("path");
const { pathToFileURL, fileURLToPath } = require("url");

function serve(folderName) {
  const configPath = pathToFileURL(path.resolve(process.cwd()));

  import(`${configPath}/config.mjs`).then(({ default: config }) => {
    const app = express();
    app.use(morgan("tiny"));
    app.set("strict routing", true);


    const staticPath = path.join(fileURLToPath(configPath), folderName);
    app.use(
      config.base || "/",
      express.static(staticPath, { redirect: false }), // Disable automatic redirection in static middleware
    );

    app.get("*", (req, res) => {
      res.sendFile(path.join(staticPath, "index.html"));
    });

    const port = process.env.PORT || config.port || 3000;

    app.listen(port, () => {
      console.log(`Server running on port ${port} with base ${config.base}`);
    });
  });
}

module.exports = { serve };
