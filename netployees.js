#!/usr/bin/env node
'use strict';

const chalk = require('chalk');
const log = console.log;
const readline = require('readline');

const sentiment = new (require('sentiment'))();
const db = new (require('./src/lib/db'))();


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: chalk.whiteBright.bold('NP> ')
});

rl.prompt();

rl.on('line', async (line) => {
  log(sentiment.analyze(line));
  await db.add(line);

  rl.prompt();
})
  .on('close', () => {
    log('cleaning...');
    db.close();
    process.exit(0);
  });
