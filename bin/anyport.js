#!/usr/bin/env node

const program = require('commander');
const getPorts = require('../lib/index.js');

program
  .version('0.1.0')
  .option('--min [n]', 'The minimum port number, default: 8000', parseInt)
  .option('--max [n]', 'The maximum port number, at most 65535', parseInt)
  .option('--num [n]', 'The number of the available ports, default: 1', parseInt)
  .parse(process.argv);

const options = {
  min: program.min,
  max: program.max,
  num: program.num,
};

getPorts(options, function (err, ports) {
  if (err) {
    process.stderr.write(err.message);
    process.exit(1);
  } else if (ports.length) {
    process.stdout.write(ports.join(',') + '\n');
  } else {
    process.stderr.write('No available ports!\n');
    process.exit(1);
  }
});

