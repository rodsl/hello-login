const { log } = console;

if (process.argv.length !== 4) {
  log(`Usage: node calc-soma.js 5 10`);
  process.exit(1);
}

const [node, script, termA, termB] = process.argv;
const ret = Number(termA) + Number(termB);
log(ret);
