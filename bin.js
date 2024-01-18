#!/usr/bin/env node
require("yargs")
  .scriptName("httpserver")
  .command({
    command: "start",
    desc: ":start http server",
    handler: () => require("./server.js"),
  })
  .demandCommand()
  .argv.toString();

