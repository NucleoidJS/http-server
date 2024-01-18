#!/usr/bin/env node
require("yargs")
  .scriptName("http-server")
  .command({
    command: "start",
    desc: ":start http server",
    handler: () => require("./server.js"),
  })
  .demandCommand()
  .argv.toString();
