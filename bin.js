#!/usr/bin/env node
require("yargs")
  .scriptName("http-server")
  .command({
    command: "start [folderName]",
    desc: "start http server",
    builder: (yargs) => {
      yargs.positional("folderName", {
        describe: "Folder to serve",
        default: "dist",
      });
    },
    handler: (argv) => require("./server.js")(argv.folderName),
  })
  .demandCommand().argv;
