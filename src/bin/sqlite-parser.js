import parser from '../lib/index';
import {
  stat,
  writeFile,
  mkdir,
  readFile
} from 'fs';
import {
  normalize,
  dirname
} from 'path';

const args = resolveArgs(process.argv.slice(2));

if (args['version']) {
  console.log(`sqlite-parser v@@VERSION`);
  process.exit(0);
}

if (args['help'] || args._.length === 0) {
  console.log(`Usage:\tsqlite-parser [infile]\n`);
  console.log(`Option\t\t\tAlias\tDescription`);
  console.log(`--output [outfile]\t-o\tWrite output to a file instead of stdout`);
  console.log(`--version\t\t-v\tGet current parser version`);
  process.exit(0);
}

const input = normalize(args._[0]);
let output = args['o'] || args['output'];

if (output) {
  output = normalize(output);
}

stat(input, function startCallback(err) {
  if (err) { return error(err); }
  readFile(input, 'utf8', readCallback);
});

function resolveArgs(argv) {
  const args = { _: [] };
  let last = null;
  const isNewArg = (arg) => !arg || arg.indexOf('-') === 0;
  const aliases = { o: 'output', v: 'version', h: 'help' };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (isNewArg(arg)) {
      const cur = arg.indexOf('--') !== -1 ? arg.slice(2) : aliases[arg.slice(1)];
      const peek = argv.length - 1 !== i ? argv[i + 1] : null;
      const peekNew = isNewArg(peek);
      args[cur] = peekNew ? true : peek;
      if (!peekNew) { i += 1; }
    } else {
      args._.push(arg);
    }
  }
  return args;
}

function error(err) {
  console.error(err.message);
  process.exit(1);
}

function writeOut(result, outPath) {
  const outDir = dirname(outPath);

  function writeCallback(err) {
    if (err) { return error(err) }
    process.exit(0);
  }

  function mkdirCallback(err) {
    if (err) { return error(err) }
    writeFile(outPath, result, writeCallback);
  }

  function statCallback(err) {
    if (err) {
      return mkdir(outDir, mkdirCallback);
    }
    mkdirCallback();
  }

  stat(outDir, statCallback);
}

function parserCallback(err, ast) {
  if (err) { return error(err) }
  let result;

  try {
    result = JSON.stringify(ast, null, 2);
  } catch (e) {
    return error(e);
  }

  if (output) {
    writeOut(result, output);
  } else {
    process.stdout.write(result);
    process.exit(0);
  }
}

function readCallback(err, data) {
  if (err) { return error(err) }
  parser(data, parserCallback);
}
