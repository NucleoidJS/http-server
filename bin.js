#!/usr/bin/env node
require("yargs")
  .scriptName("http-server")
  .command({
    command: "start [folderName]",
    desc: "Start HTTP server",
    builder: (yargs) => {
      yargs
        .positional("folderName", {
          describe: "Set folder name for the server",
          default: "dist",
        })
        .option("port", {
          alias: "p",
          describe: "Port to run the server on",
          type: "number",
          default: 3000,
        });
    },
    handler: (argv) => require("./server").serve(argv.folderName, argv.port),
  })
  .demandCommand().argv;

