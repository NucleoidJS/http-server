#!/usr/bin/env node
require("yargs")
  .scriptName("http-server")
  .command({
    command: "start [folderName]",
    desc: "Start HTTP server",
    builder: (yargs) => {
      yargs.positional("folderName", {
        describe: "Set folder name for the server",
        default: "dist",
      });
    },
    handler: (argv) => require("./server").serve(argv.folderName),
  })
  .demandCommand().argv;
