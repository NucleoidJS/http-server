const express = require("express");
const morgan = require("morgan");
const path = require("path");
const { pathToFileURL, fileURLToPath } = require("url");

function serve(folderName) {
  const configPath = pathToFileURL(path.resolve(process.cwd()));

  import(`${configPath}/config.mjs`).then(({ default: config }) => {
    const app = express();
    app.use(morgan("tiny"));

    app.use((req, res, next) => {
      if (req.path.slice(-1) === "/" && req.path.length > 1) {
        const query = req.url.slice(req.path.length);
        const safePath = req.path.slice(0, -1).replace(/\/+/g, "/");
        res.redirect(301, safePath + query);
      } else {
        next();
      }
    });

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
